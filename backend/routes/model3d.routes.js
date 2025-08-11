import { Router } from 'express';
import { searchModel } from '../controllers/model3d.controller.js';

const router = Router();
router.get('/', searchModel);
export default router;
