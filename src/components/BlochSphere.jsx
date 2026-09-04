import { useMemo,useState } from "react";

export default function BlochSphere() {
  const [theta,setTheta]=useState(45),[phi,setPhi]=useState(45);
  const v=useMemo(()=>{
    const t=theta*Math.PI/180,p=phi*Math.PI/180;
    return {x:Math.sin(t)*Math.cos(p),y:Math.sin(t)*Math.sin(p),z:Math.cos(t)};
  },[theta,phi]);
  const stateName=theta===0?"|0⟩":theta===180?"|1⟩":theta===90&&phi===0?"|+⟩":"|ψ⟩";
  return <div className="bloch-card">
    <div className="bloch-header"><div><span className="eyebrow">Live Qubit State</span><h3>Bloch Sphere</h3></div><span className="state-badge">{stateName}</span></div>
    <div className="sphere-stage">
      <div className="sphere" style={{transform:`rotateX(${20-v.y*15}deg) rotateY(${-28+v.x*28}deg)`}}>
        <div className="sphere-line horizontal"/><div className="sphere-line vertical"/>
        <div className="equator"/><div className="state-vector" style={{transform:`rotateY(${phi}deg) rotateX(${theta}deg)`}}><span/></div>
        <span className="sphere-label north">|0⟩</span><span className="sphere-label south">|1⟩</span>
      </div>
    </div>
    <div className="bloch-controls">
      <label><span>θ Polar angle <strong>{theta}°</strong></span><input type="range" min="0" max="180" value={theta} onChange={e=>setTheta(+e.target.value)}/></label>
      <label><span>φ Azimuth <strong>{phi}°</strong></span><input type="range" min="0" max="360" value={phi} onChange={e=>setPhi(+e.target.value)}/></label>
    </div>
    <div className="vector-values"><span>X {v.x.toFixed(2)}</span><span>Y {v.y.toFixed(2)}</span><span>Z {v.z.toFixed(2)}</span></div>
  </div>;
}