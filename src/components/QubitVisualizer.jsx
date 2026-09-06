import { useState } from "react";

export default function QubitVisualizer() {
  const [superposition, setSuperposition] = useState(false);

  return (
    <div className="qubit-visualizer">
      <div className="qubit-orbit orbit-one" />
      <div className="qubit-orbit orbit-two" />
      <button
        className={`qubit-core ${superposition ? "active" : ""}`}
        onClick={() => setSuperposition(!superposition)}
      >
        <span>Q</span>
      </button>
      <div className="qubit-state">
        {superposition ? (
          <><strong>Superposition</strong><span>α|0⟩ + β|1⟩</span></>
        ) : (
          <><strong>Qubit</strong><span>|0⟩</span></>
        )}
      </div>
    </div>
  );
}