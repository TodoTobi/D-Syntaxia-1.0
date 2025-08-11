import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import DetectionOverlay from '../components/DetectionOverlay.jsx';
import AIHelper from '../components/AIHelper.jsx';
import { apiIdentify, apiExplain, apiSearchModel } from '../services/api.js';

export default function Results({ go, session, updateSession }){
  const imgRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const run = async()=>{
      if (!session.imageBase64) return;
      setLoading(true);
      const det = await apiIdentify(session.imageBase64);
      const objectName = det.bestObject || 'objeto';
      const ai = await apiExplain(objectName, { useCase: 'educativo' });
      const model = await apiSearchModel(objectName);
      updateSession({ detection: det, aiText: ai.text, model3d: model.model });
      setLoading(false);
    };
    run();
  }, []);

  if (!session.imageBase64) return (
    <div className="container"><div className="card">No hay imagen. <span className="link" onClick={()=>go('home')}>Volver</span></div></div>
  );

  const best = session.detection?.bestObject;

  return (
    <>
      <Navbar go={go} />
      <div className="container">
        <div className="row">
          <div className="card" style={{ position:'relative', flex: '1 1 380px' }}>
            <img ref={imgRef} src={session.imageBase64} className="preview"/>
            {session.detection?.bestBox && <DetectionOverlay imgRef={imgRef} bestBox={session.detection.bestBox} />}
          </div>
          <div className="card" style={{ flex: '1 1 320px' }}>
            <h3>Resultado</h3>
            {loading ? <p>Analizando...</p> : (
              <>
                <p>Objeto principal: <strong>{best || 'desconocido'}</strong></p>
                {session.model3d?.name && (
                  <p>Modelo 3D: <a href={session.model3d.viewerUrl} target="_blank">{session.model3d.name}</a></p>
                )}
                <button className="btn primary" onClick={()=>go('viewer')}>Abrir vista 3D</button>
              </>
            )}
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <AIHelper text={session.aiText} />
        </div>
      </div>
    </>
  );
}
