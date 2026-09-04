import { useState } from "react";
export default function Teleportation(){
  const [step,setStep]=useState(0);
  const steps=[
    ["1","Prepare","Create an unknown state |ψ⟩ on Alice's qubit."],
    ["2","Entangle","Create a Bell pair shared by Alice and Bob."],
    ["3","Interact","Alice applies CNOT and H, then measures."],
    ["4","Classical bits","Alice sends two classical measurement bits to Bob."],
    ["5","Recover","Bob applies conditional X/Z corrections and obtains |ψ⟩."]
  ];
  return <div className="teleport-card">
    <div className="teleport-head"><div><span className="eyebrow">Algorithm Flow</span><h3>Quantum Teleportation</h3></div><span>{step+1}/5</span></div>
    <div className="teleport-rail">{steps.map((s,i)=><button key={s[0]} className={i<=step?"done":""} onClick={()=>setStep(i)}><b>{s[0]}</b><span>{s[1]}</span></button>)}</div>
    <div className="teleport-stage">
      <div className={`teleport-beam step-${step}`}><span>quantum state</span></div>
      <div className="person-node"><strong>Alice</strong><small>q₀ + q₁</small></div>
      <div className="person-node bob"><strong>Bob</strong><small>q₂</small></div>
    </div>
    <div className="teleport-explanation"><span className="eyebrow">{steps[step][1]}</span><h4>{steps[step][2]}</h4></div>
    <div className="step-actions"><button className="secondary-button" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))}>← Previous</button><button className="primary-button" disabled={step===4} onClick={()=>setStep(s=>Math.min(4,s+1))}>Next Step →</button></div>
  </div>;
}