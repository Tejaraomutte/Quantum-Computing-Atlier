import { useState } from "react";

const gates = ["I", "X", "Y", "Z", "H"];

export default function GateSimulator() {
  const [gate, setGate] = useState("H");

  const descriptions = {
    I: "Identity gate — leaves the qubit unchanged.",
    X: "Pauli-X — flips |0⟩ ↔ |1⟩.",
    Y: "Pauli-Y — rotates the qubit around the Y axis.",
    Z: "Pauli-Z — changes the phase of |1⟩.",
    H: "Hadamard — creates an equal superposition.",
  };

  return (
    <div className="gate-simulator">
      <div className="gate-panel">
        <span className="eyebrow">Quantum Operation</span>
        <h3>Gate Simulator</h3>
        <p>{descriptions[gate]}</p>
        <div className="gate-buttons">
          {gates.map((item) => (
            <button key={item} className={gate === item ? "selected" : ""} onClick={() => setGate(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="gate-stage">
        <div className="gate-wire">
          <span>|0⟩</span>
          <div className="gate-box">{gate}</div>
          <span>→</span>
          <div className={`result-state gate-${gate}`}>
            {gate === "H" ? "±" : gate === "X" ? "|1⟩" : "|0⟩"}
          </div>
        </div>
      </div>
    </div>
  );
}