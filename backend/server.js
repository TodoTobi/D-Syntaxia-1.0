import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRoutes from './routes/upload.routes.js';
import identifyRoutes from './routes/identify.routes.js';
import aiRoutes from './routes/ai.routes.js';
import model3dRoutes from './routes/model3d.routes.js';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json({ limit: '5mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/upload', uploadRoutes);
app.use('/api/identify', identifyRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/model3d', model3dRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`[SINTAXIA] Backend escuchando en :${PORT}`));
