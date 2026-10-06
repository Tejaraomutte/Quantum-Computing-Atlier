import { useState, useMemo, useCallback } from "react";
import {
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Activity,
  CheckCircle2,
  Trash2,
  Info,
  HelpCircle,
  BarChart3,
  Flame
} from "lucide-react";

// Complex number helpers
const addC = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
const subC = (a, b) => ({ re: a.re - b.re, im: a.im - b.im });
const mulC = (a, b) => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re
});
const mulReal = (a, r) => ({ re: a.re * r, im: a.im * r });
const magSq = (a) => a.re * a.re + a.im * a.im;

const SQRT2_INV = 1 / Math.SQRT2;

// Gate matrices (2x2 complex)
const GATE_MATRICES = {
  I: [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: 1, im: 0 }]
  ],
  X: [
    [{ re: 0, im: 0 }, { re: 1, im: 0 }],
    [{ re: 1, im: 0 }, { re: 0, im: 0 }]
  ],
  Y: [
    [{ re: 0, im: 0 }, { re: 0, im: -1 }],
    [{ re: 0, im: 1 }, { re: 0, im: 0 }]
  ],
  Z: [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: -1, im: 0 }]
  ],
  H: [
    [{ re: SQRT2_INV, im: 0 }, { re: SQRT2_INV, im: 0 }],
    [{ re: SQRT2_INV, im: 0 }, { re: -SQRT2_INV, im: 0 }]
  ],
  S: [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: 0, im: 1 }]
  ],
  T: [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: SQRT2_INV, im: SQRT2_INV }]
  ]
};

// Preset circuits
const PRESETS_1Q = [
  { name: "Superposition |+⟩", gates: [{ gate: "H", wire: 0 }] },
  { name: "Quantum NOT |1⟩", gates: [{ gate: "X", wire: 0 }] },
  { name: "Interference (H-Z-H)", gates: [{ gate: "H", wire: 0 }, { gate: "Z", wire: 0 }, { gate: "H", wire: 0 }] },
  { name: "Phase State |+i⟩", gates: [{ gate: "H", wire: 0 }, { gate: "S", wire: 0 }] }
];

const PRESETS_2Q = [
  {
    name: "Bell State |Φ+⟩",
    gates: [
      { gate: "H", wire: 0 },
      { gate: "CNOT", wire: "both", control: 0, target: 1 }
    ]
  },
  {
    name: "Bell State |Ψ+⟩",
    gates: [
      { gate: "X", wire: 1 },
      { gate: "H", wire: 0 },
      { gate: "CNOT", wire: "both", control: 0, target: 1 }
    ]
  },
  {
    name: "Two-Qubit Superposition",
    gates: [
      { gate: "H", wire: 0 },
      { gate: "H", wire: 1 }
    ]
  },
  {
    name: "Entangled CZ State",
    gates: [
      { gate: "H", wire: 0 },
      { gate: "H", wire: 1 },
      { gate: "CZ", wire: "both", control: 0, target: 1 }
    ]
  }
];

export default function QuantumCircuit() {
  const [numQubits, setNumQubits] = useState(2);
  const [circuit, setCircuit] = useState([
    { id: "g1", gate: "H", wire: 0 },
    { id: "g2", gate: "CNOT", wire: "both", control: 0, target: 1 }
  ]);
  const [shotsCount, setShotsCount] = useState(1024);
  const [simSeed, setSimSeed] = useState(1);

  // Switch between 1Q and 2Q modes
  const handleToggleMode = (qubits) => {
    setNumQubits(qubits);
    if (qubits === 1) {
      setCircuit([{ id: "g1", gate: "H", wire: 0 }]);
    } else {
      setCircuit([
        { id: "g1", gate: "H", wire: 0 },
        { id: "g2", gate: "CNOT", wire: "both", control: 0, target: 1 }
      ]);
    }
  };

  // Add gate helper
  const addGate = (gate, wire = 0) => {
    const newId = `g_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    if (gate === "CNOT" || gate === "CZ" || gate === "SWAP") {
      setCircuit((prev) => [
        ...prev,
        { id: newId, gate, wire: "both", control: 0, target: 1 }
      ]);
    } else {
      setCircuit((prev) => [...prev, { id: newId, gate, wire }]);
    }
  };

  // Remove gate helper
  const removeGate = (id) => {
    setCircuit((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear circuit
  const clearCircuit = () => setCircuit([]);

  // Load preset
  const loadPreset = (preset) => {
    setCircuit(
      preset.gates.map((g, idx) => ({
        ...g,
        id: `preset_${idx}_${Date.now()}`
      }))
    );
  };

  // Quantum Simulation Engine
  const simulation = useMemo(() => {
    if (numQubits === 1) {
      // 1-Qubit Simulation
      let state = [{ re: 1, im: 0 }, { re: 0, im: 0 }]; // |0⟩
      const steps = [{ step: 0, name: "Initial State |0⟩", state: [...state] }];

      for (let i = 0; i < circuit.length; i++) {
        const item = circuit[i];
        if (item.gate === "M") continue; // Measurement marker
        const mat = GATE_MATRICES[item.gate];
        if (mat) {
          const c0 = addC(mulC(mat[0][0], state[0]), mulC(mat[0][1], state[1]));
          const c1 = addC(mulC(mat[1][0], state[0]), mulC(mat[1][1], state[1]));
          state = [c0, c1];
          steps.push({
            step: i + 1,
            name: `${item.gate} applied to q₀`,
            state: [...state]
          });
        }
      }

      const p0 = magSq(state[0]);
      const p1 = magSq(state[1]);
      const totalP = p0 + p1 || 1;
      const normP0 = p0 / totalP;
      const normP1 = p1 / totalP;

      // State label
      let stateLabel = "";
      if (normP0 > 0.999) stateLabel = "Ground State (|0⟩)";
      else if (normP1 > 0.999) stateLabel = "Excited State (|1⟩)";
      else if (Math.abs(normP0 - 0.5) < 0.02 && Math.abs(state[1].re) > 0.6)
        stateLabel = state[1].re > 0 ? "Superposition (|+⟩)" : "Superposition (|−⟩)";
      else if (Math.abs(normP0 - 0.5) < 0.02 && Math.abs(state[1].im) > 0.6)
        stateLabel = state[1].im > 0 ? "Phase Superposition (|+i⟩)" : "Phase Superposition (|−i⟩)";
      else stateLabel = "Superposition State";

      // Formatted equation
      const formatCoeff = (c) => {
        const r = Math.abs(c.re) > 0.001 ? c.re.toFixed(3) : "";
        const i = Math.abs(c.im) > 0.001 ? `${c.im > 0 ? "+" : ""}${c.im.toFixed(3)}i` : "";
        if (!r && !i) return "0";
        if (r && !i) return r;
        if (!r && i) return i;
        return `${r}${i}`;
      };

      const parts = [];
      if (magSq(state[0]) > 0.0001) parts.push(`${formatCoeff(state[0])}|0⟩`);
      if (magSq(state[1]) > 0.0001) parts.push(`${formatCoeff(state[1])}|1⟩`);
      const eqString = parts.length > 0 ? parts.join(" + ") : "0";

      return {
        dimension: 2,
        basis: ["0", "1"],
        probs: { "0": normP0, "1": normP1 },
        amplitudes: state,
        eqString,
        stateLabel,
        steps
      };
    } else {
      // 2-Qubit Simulation
      // Basis: [00, 01, 10, 11]
      let state = [
        { re: 1, im: 0 },
        { re: 0, im: 0 },
        { re: 0, im: 0 },
        { re: 0, im: 0 }
      ];
      const steps = [{ step: 0, name: "Initial State |00⟩", state: [...state] }];

      for (let i = 0; i < circuit.length; i++) {
        const item = circuit[i];
        if (item.gate === "M") continue;

        if (item.gate === "CNOT") {
          // CNOT with control q0, target q1
          // |10⟩ (index 2) <-> |11⟩ (index 3)
          const next = [...state];
          next[2] = state[3];
          next[3] = state[2];
          state = next;
          steps.push({ step: i + 1, name: "CNOT (q₀ → q₁)", state: [...state] });
        } else if (item.gate === "CZ") {
          // CZ: negates |11⟩ (index 3)
          const next = [...state];
          next[3] = mulReal(state[3], -1);
          state = next;
          steps.push({ step: i + 1, name: "CZ on (q₀, q₁)", state: [...state] });
        } else if (item.gate === "SWAP") {
          // SWAP: swaps |01⟩ (index 1) and |10⟩ (index 2)
          const next = [...state];
          next[1] = state[2];
          next[2] = state[1];
          state = next;
          steps.push({ step: i + 1, name: "SWAP on (q₀, q₁)", state: [...state] });
        } else {
          // 1-Qubit gate on wire 0 or wire 1
          const mat = GATE_MATRICES[item.gate];
          if (mat) {
            const next = [...state];
            if (item.wire === 0) {
              // Apply to q0 (pairs (0,2) and (1,3))
              for (let q1 = 0; q1 <= 1; q1++) {
                const i0 = q1;
                const i1 = 2 + q1;
                const s0 = addC(mulC(mat[0][0], state[i0]), mulC(mat[0][1], state[i1]));
                const s1 = addC(mulC(mat[1][0], state[i0]), mulC(mat[1][1], state[i1]));
                next[i0] = s0;
                next[i1] = s1;
              }
            } else {
              // Apply to q1 (pairs (0,1) and (2,3))
              for (let q0 = 0; q0 <= 1; q0++) {
                const i0 = q0 * 2;
                const i1 = q0 * 2 + 1;
                const s0 = addC(mulC(mat[0][0], state[i0]), mulC(mat[0][1], state[i1]));
                const s1 = addC(mulC(mat[1][0], state[i0]), mulC(mat[1][1], state[i1]));
                next[i0] = s0;
                next[i1] = s1;
              }
            }
            state = next;
            steps.push({
              step: i + 1,
              name: `${item.gate} on q${item.wire}`,
              state: [...state]
            });
          }
        }
      }

      const p00 = magSq(state[0]);
      const p01 = magSq(state[1]);
      const p10 = magSq(state[2]);
      const p11 = magSq(state[3]);
      const totalP = p00 + p01 + p10 + p11 || 1;

      const probs = {
        "00": p00 / totalP,
        "01": p01 / totalP,
        "10": p10 / totalP,
        "11": p11 / totalP
      };

      // Entanglement calculation (concurrence check for pure states)
      // C = 2 * |c00*c11 - c01*c10|
      const termA = mulC(state[0], state[3]);
      const termB = mulC(state[1], state[2]);
      const diff = subC(termA, termB);
      const concurrence = 2 * Math.sqrt(magSq(diff));

      let stateLabel = "";
      if (concurrence > 0.85) {
        if (Math.abs(probs["00"] - 0.5) < 0.05 && Math.abs(probs["11"] - 0.5) < 0.05) {
          stateLabel = state[3].re > 0 ? "Bell State (|Φ+⟩ Maximally Entangled)" : "Bell State (|Φ−⟩ Maximally Entangled)";
        } else if (Math.abs(probs["01"] - 0.5) < 0.05 && Math.abs(probs["10"] - 0.5) < 0.05) {
          stateLabel = "Bell State (|Ψ+⟩ / |Ψ−⟩ Maximally Entangled)";
        } else {
          stateLabel = "Entangled Quantum State";
        }
      } else if (probs["00"] > 0.99) {
        stateLabel = "Ground State (|00⟩)";
      } else if (probs["11"] > 0.99) {
        stateLabel = "Excited State (|11⟩)";
      } else {
        stateLabel = "Separable / Product Superposition";
      }

      // Equation string
      const basisKeys = ["00", "01", "10", "11"];
      const parts = [];
      basisKeys.forEach((key, idx) => {
        const c = state[idx];
        if (magSq(c) > 0.0001) {
          const r = Math.abs(c.re) > 0.001 ? c.re.toFixed(3) : "";
          const i = Math.abs(c.im) > 0.001 ? `${c.im > 0 ? "+" : ""}${c.im.toFixed(3)}i` : "";
          let coeff = "";
          if (!r && !i) coeff = "0";
          else if (r && !i) coeff = r;
          else if (!r && i) coeff = i;
          else coeff = `(${r}${i})`;
          parts.push(`${coeff}|${key}⟩`);
        }
      });
      const eqString = parts.length > 0 ? parts.join(" + ") : "0";

      return {
        dimension: 4,
        basis: ["00", "01", "10", "11"],
        probs,
        amplitudes: state,
        eqString,
        stateLabel,
        concurrence,
        steps
      };
    }
  }, [circuit, numQubits]);

  // Simulated 1024 Shots Measurements
  const shotResults = useMemo(() => {
    // Generate shots based on theoretical probabilities and seed
    const counts = {};
    simulation.basis.forEach((b) => (counts[b] = 0));

    // Cumulative probabilities
    const cumProbs = [];
    let accum = 0;
    simulation.basis.forEach((b) => {
      accum += simulation.probs[b];
      cumProbs.push({ basis: b, upper: accum });
    });

    let singleCollapsed = simulation.basis[0];

    for (let i = 0; i < shotsCount; i++) {
      const rand = Math.random();
      for (let j = 0; j < cumProbs.length; j++) {
        if (rand <= cumProbs[j].upper || j === cumProbs.length - 1) {
          counts[cumProbs[j].basis]++;
          if (i === 0) singleCollapsed = cumProbs[j].basis;
          break;
        }
      }
    }

    return { counts, singleCollapsed, shots: shotsCount };
  }, [simulation, shotsCount, simSeed]);

  return (
    <div className="circuit-builder">
      {/* Header & Mode Controls */}
      <div className="circuit-builder-header">
        <div>
          <span className="eyebrow">Interactive Simulator</span>
          <h3>Quantum Circuit Builder</h3>
          <p className="circuit-header-desc">
            Assemble quantum gates on quantum register wires and inspect live state vectors, probability distributions, and measurement outcomes.
          </p>
        </div>

        <div className="circuit-header-actions">
          {/* Mode Switcher */}
          <div className="qubit-mode-toggle">
            <button
              className={`mode-btn ${numQubits === 1 ? "active" : ""}`}
              onClick={() => handleToggleMode(1)}
            >
              1 Qubit Wire
            </button>
            <button
              className={`mode-btn ${numQubits === 2 ? "active" : ""}`}
              onClick={() => handleToggleMode(2)}
            >
              2 Qubit Wires
            </button>
          </div>

          <button className="ghost-button clear-btn" onClick={clearCircuit}>
            <Trash2 size={14} /> Clear
          </button>
        </div>
      </div>

      {/* Preset Circuits Row */}
      <div className="circuit-presets-bar">
        <span className="presets-label">
          <Sparkles size={13} /> Quick Presets:
        </span>
        <div className="presets-buttons">
          {(numQubits === 1 ? PRESETS_1Q : PRESETS_2Q).map((preset) => (
            <button
              key={preset.name}
              className="preset-chip"
              onClick={() => loadPreset(preset)}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Gate Palettes */}
      <div className="gate-palette-container">
        {numQubits === 1 ? (
          <div className="palette-section">
            <span className="palette-label">Single-Qubit Gate Palette:</span>
            <div className="gate-buttons-row">
              {["H", "X", "Y", "Z", "S", "T", "M"].map((g) => (
                <button
                  key={g}
                  className={`palette-gate-btn ${g === "M" ? "measure-gate" : ""}`}
                  onClick={() => addGate(g, 0)}
                  title={`Add ${g} gate`}
                >
                  <span className="btn-symbol">{g}</span>
                  <span className="btn-sub">{g === "M" ? "Measure" : "Gate"}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="palette-section-grid">
            <div className="palette-sub">
              <span className="palette-label">Add to Wire q₀:</span>
              <div className="gate-buttons-row">
                {["H", "X", "Y", "Z", "S", "T"].map((g) => (
                  <button
                    key={`q0-${g}`}
                    className="palette-gate-btn"
                    onClick={() => addGate(g, 0)}
                  >
                    <span className="btn-symbol">{g}</span>
                    <span className="btn-sub">q₀</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="palette-sub">
              <span className="palette-label">Add to Wire q₁:</span>
              <div className="gate-buttons-row">
                {["H", "X", "Y", "Z", "S", "T"].map((g) => (
                  <button
                    key={`q1-${g}`}
                    className="palette-gate-btn secondary"
                    onClick={() => addGate(g, 1)}
                  >
                    <span className="btn-symbol">{g}</span>
                    <span className="btn-sub">q₁</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="palette-sub">
              <span className="palette-label">Entangling Gates:</span>
              <div className="gate-buttons-row">
                <button
                  className="palette-gate-btn entangle"
                  onClick={() => addGate("CNOT")}
                  title="Controlled-NOT (Control: q0, Target: q1)"
                >
                  <span className="btn-symbol">CNOT</span>
                  <span className="btn-sub">q₀→q₁</span>
                </button>
                <button
                  className="palette-gate-btn entangle"
                  onClick={() => addGate("CZ")}
                  title="Controlled-Z"
                >
                  <span className="btn-symbol">CZ</span>
                  <span className="btn-sub">q₀,q₁</span>
                </button>
                <button
                  className="palette-gate-btn entangle"
                  onClick={() => addGate("SWAP")}
                  title="SWAP Wires"
                >
                  <span className="btn-symbol">SWAP</span>
                  <span className="btn-sub">0↔1</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Circuit Canvas Wire Tracks */}
      <div className="circuit-canvas-area">
        <div className="circuit-wires-wrapper">
          {/* Wire 0 (q0) */}
          <div className="circuit-wire-row">
            <div className="wire-header">
              <span className="wire-name">q₀</span>
              <span className="wire-init">|0⟩</span>
            </div>

            <div className="wire-timeline">
              <div className="wire-spine-line" />
              {circuit.length === 0 ? (
                <div className="empty-circuit-hint">
                  Click any gate above to add it to the quantum wire
                </div>
              ) : (
                circuit.map((item, index) => {
                  if (item.wire === 0 || item.wire === "both") {
                    const isTwoQ = item.wire === "both";
                    return (
                      <div
                        className={`gate-slot-block ${isTwoQ ? "entangle-slot" : ""}`}
                        key={item.id}
                      >
                        <div
                          className={`circuit-placed-gate ${isTwoQ ? "cnot-control" : ""}`}
                          title={`${item.gate} on step ${index + 1}`}
                        >
                          {isTwoQ ? (
                            item.gate === "CNOT" ? "●" : item.gate
                          ) : (
                            item.gate
                          )}
                          <button
                            className="remove-gate-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeGate(item.id);
                            }}
                            title="Remove gate"
                          >
                            ×
                          </button>
                        </div>
                        {isTwoQ && <div className="cnot-vertical-link" />}
                      </div>
                    );
                  } else {
                    // Gate placed on wire 1, pass-through space on wire 0
                    return (
                      <div className="gate-slot-block passthrough" key={item.id}>
                        <div className="wire-passthrough-dot" />
                      </div>
                    );
                  }
                })
              )}
              <div className="wire-terminal">
                <span className="terminal-arrow">→</span>
                <span className="measurement-meter">M</span>
              </div>
            </div>
          </div>

          {/* Wire 1 (q1) - Only if 2 Qubits */}
          {numQubits === 2 && (
            <div className="circuit-wire-row">
              <div className="wire-header">
                <span className="wire-name">q₁</span>
                <span className="wire-init">|0⟩</span>
              </div>

              <div className="wire-timeline">
                <div className="wire-spine-line" />
                {circuit.map((item, index) => {
                  if (item.wire === 1 || item.wire === "both") {
                    const isTwoQ = item.wire === "both";
                    return (
                      <div
                        className={`gate-slot-block ${isTwoQ ? "entangle-slot" : ""}`}
                        key={item.id}
                      >
                        <div
                          className={`circuit-placed-gate ${isTwoQ ? "cnot-target" : ""}`}
                          title={`${item.gate} on step ${index + 1}`}
                        >
                          {isTwoQ ? (
                            item.gate === "CNOT" ? "⊕" : item.gate
                          ) : (
                            item.gate
                          )}
                          <button
                            className="remove-gate-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeGate(item.id);
                            }}
                            title="Remove gate"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="gate-slot-block passthrough" key={item.id}>
                        <div className="wire-passthrough-dot" />
                      </div>
                    );
                  }
                })}
                <div className="wire-terminal">
                  <span className="terminal-arrow">→</span>
                  <span className="measurement-meter">M</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Circuit Stats Footer */}
        <div className="circuit-canvas-footer">
          <span>
            <strong>{circuit.length}</strong> Gates in Sequence
          </span>
          <span>
            <strong>{numQubits}</strong> Active Qubits
          </span>
          <span>
            Hilbert Dimension: <strong>2^{numQubits} = {Math.pow(2, numQubits)}</strong>
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ============ PROMINENT CIRCUIT OUTPUT DISPLAY ============ */}
      {/* ======================================================== */}
      <div className="circuit-output-panel">
        <div className="circuit-output-header">
          <div className="output-header-left">
            <span className="eyebrow">
              <Activity size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
              Live Quantum State Output
            </span>
            <h3>Circuit Output & Measurement State</h3>
          </div>

          <div className="output-header-right">
            <button
              className="primary-button resample-btn"
              onClick={() => setSimSeed((s) => s + 1)}
              title="Resimulate measurement collapse"
            >
              <RotateCcw size={15} /> Simulate 1024 Shots
            </button>
          </div>
        </div>

        {/* State Equation & Classification Box */}
        <div className="state-vector-hero-card">
          <div className="state-equation-row">
            <div className="state-ket-label">|ψ_out⟩ =</div>
            <div className="state-equation-text">
              <code>{simulation.eqString}</code>
            </div>
          </div>

          <div className="state-meta-badges">
            <span className="classification-pill">
              <CheckCircle2 size={14} />
              {simulation.stateLabel}
            </span>
            <span className="purity-pill">Pure State (Tr(ρ²) = 1)</span>
            {numQubits === 2 && simulation.concurrence !== undefined && (
              <span
                className={`concurrence-pill ${simulation.concurrence > 0.5 ? "entangled" : ""}`}
              >
                Concurrence: {simulation.concurrence.toFixed(3)}
              </span>
            )}
          </div>
        </div>

        {/* Side-by-Side: Probabilities Bars & 1024 Shots Measurement Histogram */}
        <div className="output-visual-grid">
          {/* Theoretical Probabilities (Born's Rule) */}
          <div className="output-column-card">
            <div className="card-subhead">
              <BarChart3 size={16} />
              <h4>Theoretical Probabilities |⟨i|ψ⟩|²</h4>
            </div>
            <p className="card-subtext">Exact analytical probabilities derived from Born's rule.</p>

            <div className="prob-bars-stack">
              {simulation.basis.map((basisKey, idx) => {
                const prob = simulation.probs[basisKey] || 0;
                const percent = (prob * 100).toFixed(1);
                const amp = simulation.amplitudes[idx];
                const ampStr = `${amp.re >= 0 ? " " : ""}${amp.re.toFixed(3)}${amp.im >= 0 ? "+" : ""}${amp.im.toFixed(3)}i`;

                return (
                  <div className="basis-prob-row" key={basisKey}>
                    <div className="basis-key-tag">|{basisKey}⟩</div>
                    <div className="prob-bar-container">
                      <div
                        className="prob-bar-fill"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="prob-percent-text">{percent}%</div>
                    <div className="amplitude-annotation" title={`Amplitude: ${ampStr}`}>
                      amp: {ampStr}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1024 Shots Simulated Measurement Histogram */}
          <div className="output-column-card">
            <div className="card-subhead">
              <Flame size={16} />
              <h4>Simulated Measurements ({shotResults.shots} Shots)</h4>
            </div>
            <p className="card-subtext">
              Stochastic measurement collapse simulating a real quantum processor run.
            </p>

            <div className="prob-bars-stack">
              {simulation.basis.map((basisKey) => {
                const count = shotResults.counts[basisKey] || 0;
                const percent = ((count / shotResults.shots) * 100).toFixed(1);

                return (
                  <div className="basis-prob-row" key={`shot-${basisKey}`}>
                    <div className="basis-key-tag measure">|{basisKey}⟩</div>
                    <div className="prob-bar-container shot-track">
                      <div
                        className="prob-bar-fill shot-fill"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="prob-percent-text">
                      <strong>{count}</strong>
                      <small> ({percent}%)</small>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Single-shot collapse outcome */}
            <div className="single-shot-collapse-box">
              <span>Single-shot collapse:</span>
              <strong className="collapsed-basis">|{shotResults.singleCollapsed}⟩</strong>
              <small>(Qubit wavefunction collapsed upon observation)</small>
            </div>
          </div>
        </div>

        {/* Step-by-Step Gate Transformation Pipeline */}
        <div className="circuit-trace-container">
          <div className="trace-header">
            <h4>Gate Transformation Pipeline Trace</h4>
            <span className="trace-caption">State vector evolution at each circuit timestep:</span>
          </div>

          <div className="trace-steps-scroller">
            {simulation.steps.map((s) => {
              const terms = [];
              s.state.forEach((amp, idx) => {
                if (magSq(amp) > 0.0001) {
                  const bKey = numQubits === 1 ? (idx === 0 ? "0" : "1") : ["00", "01", "10", "11"][idx];
                  terms.push(`${amp.re.toFixed(2)}|${bKey}⟩`);
                }
              });
              return (
                <div className="trace-step-chip" key={s.step}>
                  <div className="chip-step-num">Step {s.step}</div>
                  <div className="chip-step-title">{s.name}</div>
                  <div className="chip-step-state">
                    <code>{terms.join(" + ") || "0"}</code>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}