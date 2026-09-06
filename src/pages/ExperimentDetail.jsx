import { Link, useParams } from "react-router-dom";
import BlochSphere from "../components/BlochSphere";
import GateSimulator from "../components/GateSimulator";
import QuantumCircuit from "../components/QuantumCircuit";
import { experiments } from "../data/experiments";

export default function ExperimentDetail() {
  const { id } = useParams();
  const experiment = experiments.find((item) => item.id === id);

  if (!experiment) {
    return <section className="page not-found"><h1>Experiment not found</h1><Link to="/experiments">Return to experiments</Link></section>;
  }

  const simulation =
    id === "bloch-sphere" ? <BlochSphere /> :
    id === "quantum-gates" ? <GateSimulator /> :
    <QuantumCircuit />;

  return (
    <section className="experiment-detail">
      <div className="experiment-heading">
        <span className="eyebrow">Experiment {experiment.number}</span>
        <h1>{experiment.title}</h1>
        <p>{experiment.description}</p>
      </div>

      <div className="learning-grid">
        <article><span>Aim</span><h2>Understand {experiment.title}</h2><p>Explore the fundamental principles behind this quantum computing concept through an interactive experiment.</p></article>
        <article><span>Theory</span><h2>Quantum mechanics in action</h2><p>Quantum information behaves differently from classical information. The simulation below allows you to observe these concepts directly.</p></article>
        <article><span>Procedure</span><h2>Experiment interactively</h2><p>Manipulate the available controls, observe the state changes and record the resulting behavior.</p></article>
      </div>

      <section className="simulation-section">
        <div className="simulation-header"><span className="eyebrow">Simulation View</span><h2>Interactive experiment</h2></div>
        {simulation}
      </section>

      <div className="observation-box"><span className="eyebrow">Observation</span><h2>What did you observe?</h2><p>Record how the quantum state changes as you interact with the simulation. Compare your observations with the theoretical behavior of the quantum system.</p></div>
      <div className="assignment-box"><span className="eyebrow">Assignment</span><h2>Think like a quantum engineer.</h2><p>What would happen if you applied another quantum operation? Explain your prediction and verify it using the simulation.</p></div>
      <div className="references"><span className="eyebrow">References</span><p>Nielsen & Chuang — Quantum Computation and Quantum Information</p><p>IBM Quantum Learning resources</p></div>
    </section>
  );
}