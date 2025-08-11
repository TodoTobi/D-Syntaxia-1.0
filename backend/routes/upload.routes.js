import { Router } from 'express';
import multer from 'multer';
import { handleUpload } from '../controllers/upload.controller.js';

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'backend/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB
router.post('/', upload.single('image'), handleUpload);
export default router;
