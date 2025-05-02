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

export default postTweet;