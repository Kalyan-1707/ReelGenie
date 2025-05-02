import { TwitterApi } from 'twitter-api-v2';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// ✅ Correct full client setup with 4 required keys
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const rwClient = twitterClient.readWrite;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const postTweet = async (req, res) => {
  try {
    const { text, imageData } = req.body;

    // Upload media if imageData is provided
    let mediaId;
    if (imageData) {
      const buffer = Buffer.from(imageData, 'base64');
      mediaId = await rwClient.v1.uploadMedia(buffer, { mimeType: 'image/png' });
    }

    const tweet = await rwClient.v2.tweet({
      text: text,
      ...(mediaId && { media: { media_ids: [mediaId] } }), // Conditionally add media
    });

    res.status(200).send(tweet);
  } catch (e) {
    console.error('Error posting tweet:', e);
    res.status(500).send({ error: 'Tweet failed', details: e.message });
  }
};

const postTweetThread = async (req, res) => {
  const { tweets } = req.body;

  if (!Array.isArray(tweets) || tweets.length === 0) {
    return res.status(400).send({ error: 'No tweets provided' });
  }

  let lastTweetId = null;
  const results = [];

  for (let i = 0; i < tweets.length; i++) {
    const tweet = tweets[i];
    const { text, imageData } = tweet;

    const logPrefix = `Tweet ${i + 1}/${tweets.length}: "${text.slice(0, 30)}..."`;

    try {
      let mediaId;
      if (imageData) {
        const buffer = Buffer.from(imageData, 'base64');
        mediaId = await rwClient.v1.uploadMedia(buffer, { mimeType: 'image/png' });
        console.log(`${logPrefix} - Image uploaded successfully: ${mediaId}`);
      }

      const payload = {
        text,
        ...(mediaId && { media: { media_ids: [mediaId] } }),
        ...(lastTweetId && { reply: { in_reply_to_tweet_id: lastTweetId } }),
      };

      let tweetResponse;
      try {
        tweetResponse = await rwClient.v2.tweet(payload);
      } catch (error) {
        console.warn(`${logPrefix} - Initial post failed: ${error.code || error.message}`);
        if (lastTweetId) {
          console.warn(`${logPrefix} - Reply failed for Tweet ${i + 1} -> Tweet ${i}: "${text.slice(0, 30)}...", replyTo: ${lastTweetId}`);
        }
        console.warn(`${logPrefix} - Retrying after delay...`);
        await sleep(500);
        tweetResponse = await rwClient.v2.tweet(payload); // retry once
      }

      lastTweetId = tweetResponse.data.id;

      results.push({
        success: true,
        index: i,
        tweetId: tweetResponse.data.id,
        text,
      });

      console.log(`${logPrefix} - Tweet posted successfully: ${tweetResponse.data.id}`);
      await sleep(500); // Delay to let Twitter finalize tweet visibility
    } catch (error) {
      console.error(`${logPrefix} - Failed to post even after retry.`);
      console.error(error);

      results.push({
        success: false,
        index: i,
        text,
        ...(lastTweetId && { replyTo: lastTweetId }),
        error: error.message || 'Unknown error',
      });

      // Do not abort — continue posting remaining parts
    }
  }

  const allSucceeded = results.every(r => r.success);

  res.status(allSucceeded ? 200 : 207).send({
    success: allSucceeded,
    threadReport: results,
  });
};

export { postTweet, postTweetThread };