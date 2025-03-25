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

Respond ONLY with the formatted JSON script, no additional text or backticks.

Example:
{
  "title": "Example Title",
  "duration": "10 Seconds",
  "frames": [
    {
      "frame_number": 1,
      "visual": "Scene description",
      "voiceover": "Dialogue",
      "music": "Music style",
      "transition": "Transition"
    }
  ]
}
`;

/**
 * Generates a script based on the user-provided prompt. The script is generated
 * by Gemini's generative AI model, which takes the prompt and a template as input.
 * The generated script is then parsed and returned as a ScriptData object.
 *
 * The script is generated based on the following requirements:
 * - Maintain consistent tone
 * - Include camera movements
 * - Add mood/atmosphere descriptions
 * - Suggest background music
 * - Include transition effects
 * - Keep frames within 2-3 seconds
 * - Ensure feasible visual descriptions
 *
 * @param prompt The user-provided prompt to generate the script from.
 * @returns A ScriptData object containing the generated script.
 */
export async function generateScript(prompt: string): Promise<ScriptData> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const result = await model.generateContent([PROMPT_TEMPLATE, prompt]);
  const response = await result.response;
  const text = response.text();
  
  return parseScriptData(text);
}

/**
 * Parses a string of JSON data into a ScriptData object.
 *
 * @param data The JSON string to parse.
 * @returns A ScriptData object containing the parsed data.
 */
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