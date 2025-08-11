import { Router } from 'express';
import { generateExplanation } from '../controllers/ai.controller.js';

const router = Router();
router.post('/', generateExplanation);
export default router;
