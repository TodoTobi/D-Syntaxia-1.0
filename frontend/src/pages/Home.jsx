import React from 'react';
import Navbar from '../components/Navbar.jsx';
import UploadArea from '../components/UploadArea.jsx';

export default function Home({ go, updateSession, session }){
  const onImage = (base64) => {
    updateSession({ imageBase64: base64 });
    go('results');
  };

  return (
    <>
      <Navbar go={go} />
      <div className="container">
        <div className="card" style={{ textAlign:'center' }}>
          <h2>Identifica objetos y aprende con 3D interactivo</h2>
          <p>Sube una imagen y deja que SINTAXIA detecte el objeto, te lo explique y te permita jugar con un modelo 3D.</p>
          <button className="btn primary" onClick={()=>document.querySelector('input[type=file]')?.click()}>Empezar</button>
        </div>
        <div style={{ marginTop: 16 }}>
          <UploadArea onImage={onImage} />
        </div>
      </div>
    </>
  );
}
