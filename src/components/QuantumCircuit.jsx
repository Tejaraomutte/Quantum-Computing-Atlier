import { useState } from "react";

const availableGates = ["H", "X", "Y", "Z", "CNOT", "M"];

export default function QuantumCircuit() {
  const [circuit, setCircuit] = useState(["H"]);

  const addGate = (gate) => setCircuit((current) => [...current, gate]);

  return (
    <div className="circuit-builder">
      <div className="circuit-toolbar">
        <div><span className="eyebrow">Interactive Laboratory</span><h3>Quantum Circuit Builder</h3></div>
        <button className="ghost-button" onClick={() => setCircuit([])}>Clear</button>
      </div>

      <div className="gate-toolbar">
        {availableGates.map((gate) => (
          <button key={gate} onClick={() => addGate(gate)}>{gate}</button>
        ))}
      </div>

      <div className="circuit-area">
        <div className="wire-label">q₀</div>
        <div className="wire">
          <span>|0⟩</span>
          {circuit.map((gate, index) => (
            <div className="circuit-gate" key={`${gate}-${index}`}>{gate}</div>
          ))}
          <span>→</span><span>M</span>
        </div>
      </div>

      <div className="circuit-info">
        <span>{circuit.length} gates</span><span>1 qubit</span><span>Measurement enabled</span>
      </div>
    </div>
  );
}