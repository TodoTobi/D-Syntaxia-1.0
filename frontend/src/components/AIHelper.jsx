export default function AIHelper({ text }){
  if (!text) return null;
  return (
    <div className="card">
      <div className="badge">Asistente</div>
      <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}
