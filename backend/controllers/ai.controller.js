import { explainWithLLM } from '../services/llm.service.js';

export const generateExplanation = async (req, res) => {
  try {
    const { objectName, context } = req.body;
    if (!objectName) return res.status(400).json({ error: 'objectName requerido' });

    const text = await explainWithLLM(objectName, context);
    res.json({ ok: true, text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Falló la IA de texto' });
  }
};
