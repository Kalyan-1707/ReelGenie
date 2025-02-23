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

const PROMPT_TEMPLATE = `You are an AI scriptwriter for ReelGenie, an AI-powered short-form video generator.
Generate a detailed script following this structured format:

Title: [A catchy, AI-generated title]
Duration: 10 Seconds

Frame 1:
📌 Visual: [Scene description with camera movement and atmosphere]
🎙️ Voiceover: [Dialogue/narration]
🎵 Music: [Music style suggestion]
🎬 Transition: [Transition to next frame]

[Repeat format for Frames 2-4]

Requirements:
- Maintain consistent tone
- Include camera movements
- Add mood/atmosphere descriptions
- Suggest background music
- Include transition effects
- Keep frames within 2-3 seconds
- Ensure feasible visual descriptions

Respond ONLY with the formatted script, no additional text.`;

export async function generateScript(prompt: string): Promise<GeneratedScript> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent([PROMPT_TEMPLATE, prompt]);
  const response = await result.response;
  const text = response.text();
  
  return parseScriptResponse(text);
}

function parseScriptResponse(text: string): GeneratedScript {
  const lines = text.split("\\n").map(line => line.trim()).filter(Boolean);
  
  // Extract title and duration from the first line
  const firstLine = lines[0];
  const titleParts = firstLine.split(/Duration:\s*/i);
  const title = titleParts[0].replace(/^Title:\s*/i, '').trim();
  const duration = titleParts[1]?.trim() || "10 Seconds";
  
  const frames: GeneratedFrame[] = [];
  let currentFrame: GeneratedFrame = {
    visual: "",
    voiceover: "",
    music: "",
    transition: ""
  };
  
  let isInFrame = false;
  
  for (const line of lines.slice(1)) {
    const lineContent = line.toLowerCase();
    const frameMatch = line.match(/^Frame \d+:/i);
    
    if (frameMatch) {
      if (isInFrame) {
        frames.push({ ...currentFrame });
        currentFrame = {
          visual: "",
          voiceover: "",
          music: "",
          transition: ""
        };
      }
      isInFrame = true;
    } else if (isInFrame) {
      if (lineContent.includes("📌 visual:") || lineContent.includes("visual:")) {
        currentFrame.visual = line.split(/(?:📌\s*)?visual:/i)[1].trim();
      } else if (lineContent.includes("🎙️ voiceover:") || lineContent.includes("voiceover:")) {
        currentFrame.voiceover = line.split(/(?:🎙️\s*)?voiceover:/i)[1].trim().replace(/["""]/g, '');
      } else if (lineContent.includes("🎵 music:") || lineContent.includes("music:")) {
        currentFrame.music = line.split(/(?:🎵\s*)?music:/i)[1].trim();
      } else if (lineContent.includes("🎬 transition:") || lineContent.includes("transition:")) {
        currentFrame.transition = line.split(/(?:🎬\s*)?transition:/i)[1].trim();
      }
    }
  }
  
  if (Object.keys(currentFrame).length > 0) {
    frames.push(currentFrame as GeneratedFrame);
  }
  
  return {
    title,
    duration,
    frames
  };
}