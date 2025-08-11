import axios from 'axios';

const systemPrompt = `Eres un tutor técnico y científico. Explica de forma clara, con ejemplos prácticos y pasos seguros.
Si es un fenómeno natural (p.ej., un rayo), incluye física básica y seguridad.
Si es un objeto técnico (p.ej., fuente de alimentación de PC), explica uso y reemplazo seguro, sin fomentar prácticas peligrosas.`;

export async function explainWithLLM(objectName, context = {}) {
  const { GROQ_API_KEY, GROQ_MODEL, HF_API_TOKEN } = process.env;
  const userPrompt = `Objeto: ${objectName}\nContexto: ${JSON.stringify(context)}\nRedacta en español, breve y práctico, con pasos.`;

  if (GROQ_API_KEY) {
    const { data } = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: GROQ_MODEL || 'mixtral-8x7b-32768',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3
    }, {
      headers: { Authorization: `Bearer ${GROQ_API_KEY}` }
    });
    return data.choices?.[0]?.message?.content?.trim() || '';
  }

  // Fallback HF Inference (text-generation)
  if (HF_API_TOKEN) {
    const { data } = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
      { inputs: `${systemPrompt}\n\n${userPrompt}` },
      { headers: { Authorization: `Bearer ${HF_API_TOKEN}` }, timeout: 60000 }
    );
    const out = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
    return (out || '').trim();
  }

  return 'Configura GROQ_API_KEY o HF_API_TOKEN para habilitar IA de texto.';
}
