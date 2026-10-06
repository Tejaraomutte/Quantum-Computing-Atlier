import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CircuitBoard,
  Cpu,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Info,
  Maximize2,
  Play,
  RotateCcw
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { quantumGates, gateCategories } from "../data/gates";

export default function Gates() {
  const { gateId } = useParams();
  const [selectedGateId, setSelectedGateId] = useState(gateId || "pauli-x");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTestIndex, setActiveTestIndex] = useState(0);

  // Filtered gates
  const filteredGates = useMemo(() => {
    return quantumGates.filter((gate) => {
      const matchesCategory =
        selectedCategory === "All" || gate.category === selectedCategory;
      const matchesSearch =
        gate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gate.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gate.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Current active gate
  const currentGate = useMemo(() => {
    return (
      quantumGates.find((g) => g.id === selectedGateId) || quantumGates[0]
    );
  }, [selectedGateId]);

  // Current gate index for Prev / Next navigation
  const currentIndex = quantumGates.findIndex((g) => g.id === currentGate.id);
  const prevGate =
    quantumGates[(currentIndex - 1 + quantumGates.length) % quantumGates.length];
  const nextGate =
    quantumGates[(currentIndex + 1) % quantumGates.length];

  // Handle selecting a gate
  const handleSelectGate = (id) => {
    setSelectedGateId(id);
    setActiveTestIndex(0);
    // Smooth scroll to details on mobile/tablets
    const detailsEl = document.getElementById("gate-details-view");
    if (detailsEl && window.innerWidth < 900) {
      detailsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeTest =
    currentGate.testInputs && currentGate.testInputs[activeTestIndex]
      ? currentGate.testInputs[activeTestIndex]
      : {
          label: currentGate.truthTable[0].input,
          state: currentGate.truthTable[0].input,
          outState: currentGate.truthTable[0].output,
          probs: { "0": 100 }
        };

  return (
    <div className="page gates-page">
      {/* Page Header */}
      <div className="gates-hero">
        <div className="gates-hero-content">
          <span className="eyebrow">
            <CircuitBoard size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
            Quantum Logic & Circuits
          </span>
          <h1>
            Atlas of <span>Quantum Gates.</span>
          </h1>
          <p>
            Explore single-qubit, two-qubit, and universal three-qubit gates.
            Inspect mathematical matrices, physical mechanics, practical algorithms, and comprehensive truth tables.
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="gates-stats-ribbon">
          <div className="stat-pill">
            <strong>20</strong>
            <span>Quantum Gates</span>
          </div>
          <div className="stat-pill">
            <strong>100%</strong>
            <span>Reversible & Unitary</span>
          </div>
          <div className="stat-pill">
            <strong>1, 2 & 3</strong>
            <span>Qubit Regimes</span>
          </div>
          <div className="stat-pill">
            <strong>Interactive</strong>
            <span>Live Truth Tables</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="gates-filter-bar">
        <div className="category-tabs">
          {gateCategories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by gate, symbol, or property..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="gate-search-input"
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="gates-main-layout">
        {/* Left Side: Gate Picker Grid */}
        <div className="gates-picker-column">
          <div className="picker-header">
            <span className="eyebrow">Select a Gate ({filteredGates.length})</span>
            <span className="picker-tip">Click any gate to inspect</span>
          </div>

          <div className="gates-selector-grid">
            {filteredGates.map((g) => {
              const isSelected = g.id === currentGate.id;
              return (
                <button
                  key={g.id}
                  className={`gate-badge-card ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSelectGate(g.id)}
                >
                  <div className="gate-badge-symbol">{g.symbol}</div>
                  <div className="gate-badge-info">
                    <h4>{g.name.split("(")[0].trim()}</h4>
                    <span className="badge-meta">
                      {g.qubits} Qubit{g.qubits > 1 ? "s" : ""} • {g.category}
                    </span>
                  </div>
                  {isSelected && <span className="active-dot" />}
                </button>
              );
            })}
          </div>

          {filteredGates.length === 0 && (
            <div className="no-gates-found">
              <Info size={28} />
              <p>No quantum gates found matching "{searchQuery}".</p>
              <button
                className="secondary-button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Detailed Gate Inspector */}
        <div className="gate-detail-column" id="gate-details-view">
          <div className="gate-inspector-panel">
            {/* Inspector Header */}
            <div className="inspector-header">
              <div className="inspector-title-area">
                <div className="gate-big-symbol">{currentGate.symbol}</div>
                <div>
                  <div className="inspector-tags">
                    <span className="tag-pill category-tag">{currentGate.category}</span>
                    <span className="tag-pill qubits-tag">
                      {currentGate.qubits} Qubit{currentGate.qubits > 1 ? "s" : ""} Operation
                    </span>
                    <span className="tag-pill unitary-tag">Unitary (U†U = I)</span>
                  </div>
                  <h2>{currentGate.name}</h2>
                  <p className="gate-summary-text">{currentGate.summary}</p>
                </div>
              </div>

              {/* Prev / Next Controls */}
              <div className="gate-stepper-controls">
                <button
                  className="step-btn"
                  onClick={() => handleSelectGate(prevGate.id)}
                  title={`Previous: ${prevGate.name}`}
                >
                  <ChevronLeft size={18} />
                  <span>Prev</span>
                </button>
                <button
                  className="step-btn"
                  onClick={() => handleSelectGate(nextGate.id)}
                  title={`Next: ${nextGate.name}`}
                >
                  <span>Next</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Interactive Simulation Sandbox */}
            <div className="inspector-section simulation-sandbox">
              <div className="sandbox-header">
                <div>
                  <span className="eyebrow">Interactive Verification</span>
                  <h3>Test Input State & Observe Transformation</h3>
                </div>
                <div className="sandbox-state-selector">
                  <span className="selector-label">Choose Input:</span>
                  <div className="input-state-buttons">
                    {currentGate.testInputs?.map((test, idx) => (
                      <button
                        key={test.label}
                        className={`state-choice-btn ${activeTestIndex === idx ? "active" : ""}`}
                        onClick={() => setActiveTestIndex(idx)}
                      >
                        {test.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantum Circuit Wire Visualization */}
              <div className="wire-simulation-display">
                <div className="wire-track">
                  <div className="wire-node input-node">
                    <span className="node-caption">Input State</span>
                    <div className="state-badge-circle">{activeTest.state}</div>
                  </div>

                  <div className="wire-connector">
                    <span className="wire-line" />
                    <span className="pulse-particle" />
                  </div>

                  <div className="gate-circuit-box">
                    <span className="circuit-box-symbol">{currentGate.symbol}</span>
                    <span className="circuit-box-label">{currentGate.qubits}Q Gate</span>
                  </div>

                  <div className="wire-connector">
                    <span className="wire-line" />
                    <span className="pulse-particle" />
                  </div>

                  <div className="wire-node output-node">
                    <span className="node-caption">Output State</span>
                    <div className="state-badge-circle highlight">{activeTest.outState}</div>
                  </div>
                </div>

                {/* Probabilities Output */}
                {activeTest.probs && (
                  <div className="measurement-outcome-bar">
                    <div className="outcome-title">
                      <span>Computational Measurement Probabilities:</span>
                    </div>
                    <div className="outcome-bars-list">
                      {Object.entries(activeTest.probs).map(([basis, percent]) => (
                        <div key={basis} className="prob-meter-row">
                          <span className="basis-label">|{basis}⟩</span>
                          <div className="meter-track">
                            <div
                              className="meter-fill"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="prob-value">{percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Complete Quantum Truth Table */}
            <div className="inspector-section truth-table-section">
              <div className="section-title-wrap">
                <span className="eyebrow">State Transitions</span>
                <h3>Quantum Truth Table</h3>
                <p>
                  Quantum operations map basis vectors through linear unitary transformations.
                  Here is the exact truth table representing input-to-output mappings.
                </p>
              </div>

              <div className="truth-table-wrapper">
                <table className="quantum-truth-table">
                  <thead>
                    <tr>
                      <th style={{ width: "18%" }}>Input State |ψ_in⟩</th>
                      <th style={{ width: "24%" }}>Output State |ψ_out⟩</th>
                      <th style={{ width: "22%" }}>Phase / Amplitude Shift</th>
                      <th style={{ width: "36%" }}>Transformation Behavior & Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentGate.truthTable.map((row, index) => {
                      const isHighlighted =
                        activeTest &&
                        (row.input === activeTest.label ||
                          row.input === activeTest.state ||
                          activeTest.label.includes(row.input));
                      return (
                        <tr
                          key={index}
                          className={isHighlighted ? "highlighted-row" : ""}
                        >
                          <td className="mono-cell input-cell">
                            <strong>{row.input}</strong>
                          </td>
                          <td className="mono-cell output-cell">
                            <span className="output-badge">{row.output}</span>
                          </td>
                          <td className="phase-cell">
                            <span className="phase-text">{row.phase}</span>
                          </td>
                          <td className="explanation-cell">{row.explanation}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mathematical Matrix & Properties */}
            <div className="inspector-grid-two">
              {/* Unitary Matrix Display */}
              <div className="inspector-card matrix-card">
                <span className="eyebrow">Linear Algebra</span>
                <h3>Unitary Matrix U</h3>
                <p>Matrix representation in computational basis.</p>

                <div className="matrix-display-container">
                  <div className="matrix-bracket left" />
                  <div
                    className="matrix-grid"
                    style={{
                      gridTemplateColumns: `repeat(${currentGate.matrix[0].length}, 1fr)`
                    }}
                  >
                    {currentGate.matrix.map((row, rIdx) =>
                      row.map((val, cIdx) => (
                        <div key={`${rIdx}-${cIdx}`} className="matrix-cell">
                          {val}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="matrix-bracket right" />
                </div>

                <div className="matrix-meta">
                  <div className="meta-item">
                    <span>Determinant:</span>
                    <strong>{currentGate.properties.determinant}</strong>
                  </div>
                  <div className="meta-item">
                    <span>Eigenvalues:</span>
                    <strong>{currentGate.properties.eigenvalues}</strong>
                  </div>
                </div>
              </div>

              {/* Algebraic Properties */}
              <div className="inspector-card properties-card">
                <span className="eyebrow">Algebraic Checks</span>
                <h3>Operator Properties</h3>
                <p>Crucial invariants for circuit compilation.</p>

                <div className="properties-list">
                  <div className="prop-row">
                    <span className="prop-name">Unitary Operator:</span>
                    <span className="prop-val success">
                      <CheckCircle2 size={15} /> {currentGate.properties.unitary}
                    </span>
                  </div>
                  <div className="prop-row">
                    <span className="prop-name">Hermitian (Self-Adjoint):</span>
                    <span className="prop-val">
                      {currentGate.properties.hermitian}
                    </span>
                  </div>
                  <div className="prop-row">
                    <span className="prop-name">Involutory (Self-Inverse):</span>
                    <span className="prop-val">
                      {currentGate.properties.selfInverse}
                    </span>
                  </div>
                  <div className="prop-row">
                    <span className="prop-name">Bloch Action:</span>
                    <span className="prop-val bloch-action">
                      {currentGate.blochAction}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* In-Depth Functionality & Mechanism */}
            <div className="inspector-section functionality-section">
              <span className="eyebrow">Theory & Mechanics</span>
              <h3>Detailed Functionality of {currentGate.name}</h3>

              <div className="functionality-content-cards">
                <div className="content-card">
                  <h4>What does this gate do?</h4>
                  <p>{currentGate.functionality.overview}</p>
                </div>

                <div className="content-card">
                  <h4>Mathematical Mechanism</h4>
                  <p>{currentGate.functionality.mechanism}</p>
                </div>

                <div className="content-card">
                  <h4>Classical Logic Comparison</h4>
                  <p>{currentGate.functionality.classicalAnalogue}</p>
                </div>

                <div className="content-card">
                  <h4>Geometric Interpretation</h4>
                  <p>{currentGate.functionality.geometric}</p>
                </div>
              </div>
            </div>

            {/* Practical Applications & Algorithms */}
            <div className="inspector-section applications-section">
              <span className="eyebrow">Real-World Algorithms</span>
              <h3>Where is the {currentGate.symbol} Gate Used?</h3>

              <div className="applications-badge-grid">
                {currentGate.applications.map((app, index) => (
                  <div key={index} className="app-badge-item">
                    <div className="app-badge-bullet">{index + 1}</div>
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Module CTA */}
            <div className="inspector-footer-cta">
              <div>
                <h4>Ready to test in a multi-gate circuit?</h4>
                <p>
                  Combine this gate with other operations in the interactive circuit builder or explore hands-on experiments.
                </p>
              </div>
              <div className="footer-cta-buttons">
                <Link to="/explore" className="secondary-button">
                  Circuit Builder <ArrowRight size={16} />
                </Link>
                <Link to="/experiments" className="primary-button">
                  View Experiments <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
