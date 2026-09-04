import { useState } from "react";

export default function TwoQubitEntanglement(){
  const [entangled,setEntangled]=useState(false),[result,setResult]=useState(null);
  const measure=()=>setResult(Math.random()<.5?0:1);
  return <div className="entangle-card">
    <div className="entangle-head"><div><span className="eyebrow">Two-Qubit Laboratory</span><h3>Entanglement Demonstrator</h3></div><span className={`status-pill ${entangled?"on":""}`}>{entangled?"ENTANGLED":"SEPARABLE"}</span></div>
    <div className="qubit-pair">
      <div className={`pair-node ${entangled?"linked":""}`}><span>q₀</span><strong>{result===null?"|0⟩":`|${result}⟩`}</strong></div>
      <div className={`entangle-link ${entangled?"active":""}`}><i/><i/><i/><span>{entangled?"CORRELATED":"apply H + CNOT"}</span></div>
      <div className={`pair-node ${entangled?"linked":""}`}><span>q₁</span><strong>{result===null?"|0⟩":`|${result}⟩`}</strong></div>
    </div>
    <div className="entangle-actions">
      <button className="primary-button" onClick={()=>{setEntangled(true);setResult(null)}}>Create Bell Pair</button>
      <button className="secondary-button" disabled={!entangled} onClick={measure}>Measure Both</button>
      <button className="ghost-button" onClick={()=>{setEntangled(false);setResult(null)}}>Reset</button>
    </div>
    <div className="entangle-note">{!entangled?"The qubits begin independently in |00⟩.":result===null?"Bell state prepared: (|00⟩ + |11⟩)/√2. Measure both and observe matching outcomes.":`Both measurements matched: |${result}${result}⟩. The correlation is the key observation.`}</div>
  </div>;
}