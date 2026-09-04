import { useMemo,useState } from "react";
import ProbabilityBars from "./ProbabilityBars";

const gates=["H","X","Y","Z","M"];
function applyGate(state,g){
  if(g==="X")return [state[1],state[0]];
  if(g==="H")return [(state[0]+state[1])/Math.sqrt(2),(state[0]-state[1])/Math.sqrt(2)];
  if(g==="Z")return [state[0],-state[1]];
  if(g==="Y")return [-state[1],state[0]];
  return state;
}
export default function QuantumCircuit(){
  const [circuit,setCircuit]=useState(["H"]),[measured,setMeasured]=useState(false);
  const result=useMemo(()=>{
    let s=[1,0];
    for(const g of circuit){if(g!=="M")s=applyGate(s,g);}
    return {a:s[0],b:s[1]};
  },[circuit]);
  const p0=result.a*result.a,p1=result.b*result.b;
  const add=g=>{setCircuit(c=>[...c,g]);setMeasured(false)};
  const clear=()=>{setCircuit([]);setMeasured(false)};
  const stateText=Math.abs(p0-1)<.001?"|0⟩":Math.abs(p1-1)<.001?"|1⟩":`(${result.a.toFixed(2)})|0⟩ + (${result.b.toFixed(2)})|1⟩`;
  return <div className="circuit-builder">
    <div className="circuit-toolbar"><div><span className="eyebrow">Live Quantum Circuit</span><h3>Build • Apply • Observe</h3></div><button className="ghost-button" onClick={clear}>Clear</button></div>
    <p className="circuit-help">Add gates and watch the calculated single-qubit state and measurement probabilities update.</p>
    <div className="gate-toolbar">{gates.map(g=><button key={g} onClick={()=>add(g)}>{g}</button>)}</div>
    <div className="circuit-area"><div className="wire-label">q₀</div><div className="wire"><span>|0⟩</span>{circuit.map((g,i)=><div className={`circuit-gate ${g==="M"?"measure-gate":""}`} key={`${g}-${i}`}>{g}</div>)}<span>→</span><span>M</span></div></div>
    <div className="circuit-live-grid">
      <div className="state-readout"><span className="eyebrow">Current state</span><strong>{stateText}</strong><small>{circuit.length} operation{circuit.length===1?"":"s"} in circuit</small></div>
      <ProbabilityBars p0={p0} p1={p1}/>
    </div>
    <button className="measure-button" onClick={()=>setMeasured(true)}>Run Measurement</button>
    {measured&&<div className="measurement-result"><span className="live-dot"/> Measurement sampled from the displayed probability distribution.</div>}
  </div>;
}