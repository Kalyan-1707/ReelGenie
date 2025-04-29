import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateScriptRoute, generateImageRoute } from './routes/script.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json());


// Routes
app.use('/api', generateScriptRoute);
app.use('/api', generateImageRoute);

let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} else {
  server = app;
}

export default app;