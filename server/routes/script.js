import express from 'express';
import multer from 'multer';
import { generateScript } from '../services/gemini.js';

const generateScriptRoute = express.Router();

generateScriptRoute.post('/generate-script', async (req, res) => {
  try {
    const { prompt } = req.body;
    const script = await generateScript(prompt);
        res.json(script);
      } catch (error) {
        console.error('Error generating script:', error);
        res.status(500).json({ error: 'Failed to generate script' });
      }
    });

const generateImageRoute = express.Router();
const upload = multer();

generateImageRoute.post('/generate-image', upload.none(), async (req, res) => {

  console.log('requested');
  try {
    const apiKey = process.env.FLUX_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'FLUX_API_KEY not found in environment variables' });
    }
    const prompt = req.body.prompt;

    const response = await fetch('https://api.together.xyz/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "model": "black-forest-labs/FLUX.1-schnell-Free",
        "prompt": prompt,
        "width": 1024,
        "height": 768,
        "steps": 4,
        "n": 1,
        "response_format": "b64_json",
        "stop": []
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error generating image:', data);
      return res.status(500).json({ error: 'Failed to generate image', details: data });
    }

    res.json(data);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

export { generateScriptRoute, generateImageRoute };