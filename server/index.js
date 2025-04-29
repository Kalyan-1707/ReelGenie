import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateScriptRoute, generateImageRoute, generateThreadScriptRoute } from './routes/script.js';
import postTweet from './routes/twitter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin.trim())) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS
app.use(cors(corsOptions));

// Handle preflight
app.options('*', cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api', generateScriptRoute);
app.use('/api', generateImageRoute);
app.use('/api', generateThreadScriptRoute);
app.use('/twitter', postTweet);

let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} else {
  server = app;
}

export default app;