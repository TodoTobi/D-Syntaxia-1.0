import React, { useState } from 'react';
import Home from './pages/Home.jsx';
import Results from './pages/Results.jsx';
import Viewer3D from './pages/Viewer3D.jsx';

export default function App(){
  const [route, setRoute] = useState('home');
  const [session, setSession] = useState({ imageBase64: null, detection: null, aiText: '' });

  const go = (r) => setRoute(r);
  const updateSession = (patch) => setSession(prev => ({ ...prev, ...patch }));

  return (
    <div className="app">
      {route === 'home' && <Home go={go} session={session} updateSession={updateSession} />}
      {route === 'results' && <Results go={go} session={session} updateSession={updateSession} />}
      {route === 'viewer' && <Viewer3D go={go} session={session} />}
    </div>
  );
}
