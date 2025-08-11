export const handleUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No se recibió imagen' });
    const url = `/uploads/${req.file.filename}`;
    return res.json({ ok: true, path: url, filename: req.file.filename });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Falló la subida' });
  }
};
