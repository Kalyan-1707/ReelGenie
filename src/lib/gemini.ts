import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing Gemini API key");
}

const genAI = new GoogleGenerativeAI(apiKey);

export interface GeneratedFrame {
  visual: string;
  voiceover: string;
  music: string;
  transition: string;
}

export interface GeneratedScript {
  title: string;
  duration: string;
  frames: GeneratedFrame[];
}

export interface ScriptData {
  title: string;
  duration: string;
  frames: Frame[];
}

export interface Frame {
  frame_number: number;
  visual: string;
  voiceover: string;
  music: string;
  transition: string;
}

const PROMPT_TEMPLATE = `You are an AI scriptwriter for ReelGenie, an AI-powered short-form video generator.
Generate a detailed script following this structured JSON format:

{
  "title": "[A catchy, AI-generated title]",
  "duration": "10 Seconds",
  "frames": [
    {
      "frame_number": 1,
      "visual": "[Scene description with camera movement and atmosphere]",
      "voiceover": "[Dialogue/narration]",
      "music": "[Music style suggestion]",
      "transition": "[Transition to next frame]"
    },
    {
      "frame_number": 2,
      "visual": "[Scene description with camera movement and atmosphere]",
      "voiceover": "[Dialogue/narration]",
      "music": "[Music style suggestion]",
      "transition": "[Transition to next frame]"
    },
    {
      "frame_number": 3,
      "visual": "[Scene description with camera movement and atmosphere]",
      "voiceover": "[Dialogue/narration]",
      "music": "[Music style suggestion]",
      "transition": "[Transition to next frame]"
    },
    {
      "frame_number": 4,
      "visual": "[Scene description with camera movement and atmosphere]",
      "voiceover": "[Dialogue/narration]",
      "music": "[Music style suggestion]",
      "transition": "[Transition to next frame]"
    }
  ]
}

Requirements:
- Maintain consistent tone
- Include camera movements
- Add mood/atmosphere descriptions
- Suggest background music
- Include transition effects
- Keep frames within 2-3 seconds
- Ensure feasible visual descriptions

Respond ONLY with the formatted JSON script, no additional text.`;

export async function generateScript(prompt: string): Promise<ScriptData> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent([PROMPT_TEMPLATE, prompt]);
  const response = await result.response;
  const text = response.text();
  
  return parseScriptData(text);
}

const parseScriptData = (data: string): ScriptData => {
  const jsonData = JSON.parse(data);
  const scriptData: ScriptData = {
    title: jsonData.title,
    duration: jsonData.duration,
    frames: jsonData.frames.map((frame: any) => ({
      frame_number: frame.frame_number,
      visual: frame.visual,
      voiceover: frame.voiceover,
      music: frame.music,
      transition: frame.transition,
    })),
  };
  return scriptData;
};