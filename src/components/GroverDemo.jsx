import { useState } from "react";
export default function GroverDemo(){
  const [running,setRunning]=useState(false),[round,setRound]=useState(0);
  const bars=[.25,.25,.25,.25];
  const target=2;
  const amp=running?[.08,.08,.08,.92]:bars;
  return <div className="grover-card">
    <div className="grover-head"><div><span className="eyebrow">Search Algorithm</span><h3>Grover's Algorithm</h3></div><span>Target: |10⟩</span></div>
    <p>Amplitude amplification increases the probability of measuring the marked state.</p>
    <div className="grover-bars">{amp.map((v,i)=><div className="grover-bar-wrap" key={i}><div className="grover-bar" style={{height:`${Math.max(16,v*190)}px`}}><span>{Math.round(v*100)}%</span></div><small>|{i.toString(2).padStart(2,"0")}⟩</small></div>)}</div>
    <div className="grover-actions"><button className="primary-button" onClick={()=>{setRunning(true);setRound(1)}}>{running?"Amplification complete":"Run Grover Search"}</button><button className="ghost-button" onClick={()=>{setRunning(false);setRound(0)}}>Reset</button><span>Iterations: {round}</span></div>
    {running&&<div className="measurement-result"><span className="live-dot"/> Marked state |10⟩ now dominates the measurement distribution.</div>}
  </div>;
}