import { find3DModel } from '../services/modelSearch.service.js';

export const searchModel = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'q requerido' });

    const model = await find3DModel(q);
    res.json({ ok: true, model });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Falló la búsqueda de modelo 3D' });
  }
};
