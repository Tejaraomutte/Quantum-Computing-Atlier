export default function ProbabilityBars({p0,p1,label="Measurement probability"}) {
  return <div className="probability-card">
    <div className="probability-heading"><span>{label}</span><small>Changes live</small></div>
    <div className="prob-row"><div className="prob-label"><span>|0⟩</span><strong>{Math.round(p0*100)}%</strong></div><div className="prob-track"><div className="prob-fill cyan" style={{width:`${p0*100}%`}}/></div></div>
    <div className="prob-row"><div className="prob-label"><span>|1⟩</span><strong>{Math.round(p1*100)}%</strong></div><div className="prob-track"><div className="prob-fill violet" style={{width:`${p1*100}%`}}/></div></div>
  </div>;
}