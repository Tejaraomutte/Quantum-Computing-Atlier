import { useMemo,useState } from "react";
import ProbabilityBars from "./ProbabilityBars";

const gates=["I","X","Y","Z","H"];
const desc={
  I:"Identity: the qubit remains unchanged.",
  X:"Pauli-X flips |0⟩ and |1⟩.",
  Y:"Pauli-Y rotates the state around the Y axis.",
  Z:"Pauli-Z changes the phase of |1⟩.",
  H:"Hadamard creates an equal superposition from |0⟩."
};
export default function GateSimulator(){
  const [gate,setGate]=useState("H"),[measure,setMeasure]=useState(false);
  const state=useMemo(()=>{
    if(gate==="H")return {p0:.5,p1:.5,label:"|+⟩ = (|0⟩ + |1⟩)/√2"};
    if(gate==="X")return {p0:0,p1:1,label:"|1⟩"};
    return {p0:1,p1:0,label:"|0⟩"};
  },[gate]);
  return <div className="gate-lab">
    <div className="gate-panel"><span className="eyebrow">Quantum Operation</span><h3>Gate Simulator</h3><p>{desc[gate]}</p>
      <div className="gate-buttons">{gates.map(g=><button className={gate===g?"selected":""} key={g} onClick={()=>{setGate(g);setMeasure(false)}}>{g}</button>)}</div>
    </div>
    <div className="gate-result">
      <div className="gate-circuit-mini"><span>|0⟩</span><div className="mini-wire"/><div className="gate-box pulse">{gate}</div><div className="mini-wire"/><span>→</span><strong>{state.label}</strong></div>
      <ProbabilityBars p0={state.p0} p1={state.p1}/>
      <button className="measure-button" onClick={()=>setMeasure(true)}>Measure Qubit</button>
      {measure && <div className="measurement-result"><span className="live-dot"/> Measurement result: <strong>{state.p1>0.5?"|1⟩":"|0⟩"}</strong>{gate==="H"&&" (one possible outcome)"}</div>}
    </div>
  </div>;
}