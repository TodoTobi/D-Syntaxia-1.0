import React from 'react';
import Navbar from '../components/Navbar.jsx';
import ThreeViewer from '../components/ThreeViewer.jsx';

export default function Viewer3D({ go, session }){
  return (
    <>
      <Navbar go={go} />
      <div className="container">
        <h3>Vista 3D interactiva</h3>
        <p>Puedes rotar, hacer zoom y experimentar (MVP: demo con geometría). En producción, cargaremos el .glb/.gltf correspondiente.</p>
        <ThreeViewer modelUrl={session.model3d?.downloadUrl} />
        <div style={{ marginTop: 12 }}>
          <span className="link" onClick={()=>go('results')}>Volver a resultados</span>
        </div>
      </div>
    </>
  );
}
