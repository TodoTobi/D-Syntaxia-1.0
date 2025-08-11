export default function Navbar({ go }){
  return (
    <div className="nav container">
      <h1>⚡ SINTAXIA</h1>
      <div>
        <span className="link" onClick={()=>go('home')}>Inicio</span>
      </div>
    </div>
  );
}
