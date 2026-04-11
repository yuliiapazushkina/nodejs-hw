import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

await connectMongoDB();

// middleware
app.use(logger);
app.use(cors());
app.use(express.json());

// routes
app.use(notesRoutes);

// 404
app.use(notFoundHandler);

// error
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
