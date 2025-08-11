import axios from 'axios';

const HF_API = 'https://api-inference.huggingface.co/models/';
const MODEL = process.env.HF_DETECTION_MODEL || 'facebook/detr-resnet-50';

export async function detectObjects(imageBase64) {
  const token = process.env.HF_API_TOKEN;
  if (!token) throw new Error('Falta HF_API_TOKEN');

  // imageBase64: "data:image/jpeg;base64,...."
  const base64Data = imageBase64.split(',')[1];
  const imgBuffer = Buffer.from(base64Data, 'base64');

  const { data } = await axios.post(
    `${HF_API}${encodeURIComponent(MODEL)}`,
    imgBuffer,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/octet-stream'
      },
      timeout: 60000
    }
  );

  // Normalizar salida: [{label, score, box:{xmin,ymin,xmax,ymax}}]
  const detections = (data || []).map(d => ({
    label: d.label || d.entity_group || 'object',
    score: d.score || d.score_confidence || 0,
    box: d.box || d.bounding_box || {
      xmin: d.box?.xmin ?? d.xmin,
      ymin: d.box?.ymin ?? d.ymin,
      xmax: d.box?.xmax ?? d.xmax,
      ymax: d.box?.ymax ?? d.ymax
    }
  }));

  // Seleccionar la mejor detección (MVP)
  const best = detections.sort((a,b) => b.score - a.score)[0];
  return { model: MODEL, detections, bestObject: best?.label || null, bestBox: best?.box || null };
}
