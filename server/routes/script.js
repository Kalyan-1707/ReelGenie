import express from 'express';
import { generateScript } from '../services/gemini.js';

const router = express.Router();

router.post('/generate-script', async (req, res) => {
  try {
    const { prompt } = req.body;
    const script = await generateScript(prompt);
        res.json(script);
      } catch (error) {
        console.error('Error generating script:', error);
        res.status(500).json({ error: 'Failed to generate script' });
      }
    });

export { router as generateScriptRoute };