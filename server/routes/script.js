import express from 'express';
import multer from 'multer';
import { generateScript, generateThreadScript } from '../services/gemini.js';

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

generateScriptRoute.post('/generate-thread-script', async (req, res) => {
  try {
    const { prompt, numberOfThreads } = req.body;
    const threadPrompt = `You are an AI storyteller called ThreadGenie, helping users turn creative ideas into short-form anime-inspired Twitter/X threads.

The user has provided a story idea and wants you to generate a structured thread script along with image prompts for each post. Your job is to:

1. Break the story into the given number of parts (${numberOfThreads} parts = 1 post in a thread)
2. Each part should include:
   - A short tweet (within 280 characters)
   - A vivid visual description for image generation (anime-style, cinematic, detailed)
3. Maintain story flow, character consistency, and a unified tone
4. Format your output in clean, parseable JSON

Use this output format:

{
  "title": "[Auto-generated story title]",
  "threads": [
    {
      "thread_number": 1,
      "tweet": "Text of the tweet here",
      "image_prompt": "Anime-style visual description here"
    },
    {
      "thread_number": 2,
      "tweet": "...",
      "image_prompt": "..."
    }
  ]
}

Guidelines:
- Tweet text should feel natural, engaging, and human
- Use anime tropes, emotion, and pacing
- Image prompts must describe camera angles, lighting, setting, character style (for FLUX.1 model)
- Keep continuity across threads

User Input:
Prompt: "\${prompt}"
Number of Threads: \${numberOfThreads}`;
    const script = await generateThreadScript(prompt, numberOfThreads);
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

export { generateScriptRoute, generateImageRoute, generateScriptRoute as generateThreadScriptRoute };