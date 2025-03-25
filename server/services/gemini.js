import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("Missing Gemini API key");
}

const genAI = new GoogleGenerativeAI(apiKey);

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


export async function generateScript(prompt, maxRetries = 3) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent([PROMPT_TEMPLATE, prompt]);
      const response = await result.response;
      let text = response.text();
            // Remove markdown code block delimiters if present
            text = text.replace(/^```json\n|\n```$/g, '');
            
            // Clean up any remaining markdown artifacts
      text = text.trim();
      
      try {
                    const parsedJson = JSON.parse(text);
                    // Validate the expected structure
                    if (!parsedJson.title || !Array.isArray(parsedJson.frames)) {
                      throw new Error("Invalid script structure");
                    }
                    console.log("Successfully parsed JSON on attempt:", attempt);
                    return parsedJson;
                  } catch (parseError) {
                    if (attempt === maxRetries) {
                      console.error(`Failed to parse script JSON (Attempt ${attempt}/${maxRetries}):`, parseError);
                      throw new Error("Failed to generate valid script format after multiple attempts");
                    }
                    console.warn(`Invalid JSON format received (Attempt ${attempt}/${maxRetries}). Retrying...`);
                  }
                } catch (apiError) {
            if (attempt === maxRetries) {
              console.error(`Gemini API error (Attempt ${attempt}/${maxRetries}):`, apiError);
              throw new Error("Failed to generate script due to API errors");
            }
            console.warn(`API call failed (Attempt ${attempt}/${maxRetries}). Retrying...`);
            // Add a small delay before retrying
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }
        }
        throw new Error("Failed to generate script after multiple attempts");
      }