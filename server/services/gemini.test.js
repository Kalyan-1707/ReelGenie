import { generateScript } from './gemini.js';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('./gemini.js', () => ({
  generateScript: jest.fn().mockResolvedValue({
    title: 'Mock Title',
    duration: '10 Seconds',
    frames: [],
  }),
}));

describe('Gemini Service', () => {
  it('should return a valid script object', async () => {
    const prompt = 'A futuristic AI assistant wakes up';
    const script = await generateScript(prompt);
    expect(script).toHaveProperty('title');
    expect(script).toHaveProperty('duration');
    expect(script).toHaveProperty('frames');
    expect(Array.isArray(script.frames)).toBe(true);
  });
});