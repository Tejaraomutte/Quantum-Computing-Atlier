import { useState } from "react";

export default function QubitVisualizer() {
  const [superposition,setSuperposition]=useState(false);
  return <div className="qubit-visualizer">
    <div className="qubit-orbit orbit-one"/><div className="qubit-orbit orbit-two"/>
    <button className={`qubit-core ${superposition?"active":""}`} onClick={()=>setSuperposition(!superposition)}>
      <span>Q</span>
    </button>
    <div className="qubit-state">
      <strong>{superposition?"Superposition":"Qubit"}</strong>
      <span>{superposition?"α|0⟩ + β|1⟩":"|0⟩"}</span>
    </div>
  </div>;
}