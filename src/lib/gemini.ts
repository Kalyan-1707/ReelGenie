export interface GeneratedFrame {
  visual: string;
  voiceover: string;
  music: string;
  transition: string;
}

export interface GeneratedFrame {
  visual: string;
  voiceover: string;
  music: string;
  transition: string;
}

export interface GeneratedThread {
  thread_number: number;
  tweet: string;
  image_prompt: string;
}

export interface GeneratedScript {
  title: string;
  threads: GeneratedThread[];
}

export interface GeneratedFrameScript {
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
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const url = backendUrl + '/api/generate-script';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate script');
  }

  const data = await response.json();
  return data;
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