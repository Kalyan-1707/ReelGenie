import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateScriptRoute } from './routes/script.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', generateScriptRoute);

let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} else {
  server = app;
}

export { app, server };