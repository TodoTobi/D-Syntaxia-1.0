import { Router } from 'express';
import { identifyObject } from '../controllers/identify.controller.js';

const router = Router();
router.post('/', identifyObject);
export default router;
