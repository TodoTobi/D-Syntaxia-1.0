import { detectObjects } from '../services/yolo.service.js';

export const identifyObject = async (req, res) => {
  try {
    const { imageBase64 } = req.body; // alternativa a archivo: dataURL
    if (!imageBase64) return res.status(400).json({ error: 'imageBase64 requerido' });

    const result = await detectObjects(imageBase64);
    res.json({ ok: true, ...result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'No se pudo identificar el objeto' });
  }
};
