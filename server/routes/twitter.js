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
    const imagePath = path.join(__dirname, '../frame-1.jpeg');
    const image = fs.readFileSync(imagePath);
    const buffer = Buffer.from(image);

    const mediaId = await rwClient.v1.uploadMedia(buffer, { mimeType: 'image/jpeg' });

    const tweet = await rwClient.v2.tweet({
      text: 'This is a test tweet with an image! 🚀',
      media: { media_ids: [mediaId] }
    });

    res.status(200).send(tweet);
  } catch (e) {
    console.error('Error posting tweet:', e);
    res.status(500).send({ error: 'Tweet failed', details: e.message });
  }
};

export default postTweet;