import { generateScriptRoute } from '../routes/script.js';
import request from 'supertest';
import dotenv from 'dotenv';
import { app } from '../index.js';

dotenv.config();

describe('Generate Script Route', () => {
  it('should return a 200 status code', async () => {
    const res = await request(app)
      .post('/api/generate-script')
      .send({ prompt: 'A futuristic AI assistant wakes up' });
    expect(res.statusCode).toEqual(200);
  });
});