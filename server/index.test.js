import request from 'supertest';
import { app, server } from './index.js';

describe('Server', () => {
  let testServer;

  beforeAll((done) => {
    testServer = server.listen(3001, () => {
      console.log('Server started for testing');
      done();
    });
  });

  afterAll((done) => {
    testServer.close(() => {
      console.log('Server stopped for testing');
      done();
    });
  });

  it('should return 404 for the root path', async () => {
    const res = await request(testServer).get('/');
    expect(res.statusCode).toEqual(404);
  });
});