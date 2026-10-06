import { Atom, BrainCircuit, CircuitBoard, FlaskConical, Layers, Orbit } from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  { icon: <Atom />, title: "Qubit Fundamentals", description: "Learn how quantum information is represented.", path: "/experiments/single-qubit" },
  { icon: <Orbit />, title: "Bloch Sphere", description: "Visualize the state of a single qubit.", path: "/experiments/bloch-sphere" },
  { icon: <CircuitBoard />, title: "Quantum Gates", description: "Transform qubit states with quantum operations.", path: "/gates" },
  { icon: <Layers />, title: "Superposition", description: "Explore multiple quantum states at once.", path: "/experiments/superposition" },
  { icon: <BrainCircuit />, title: "Entanglement", description: "Discover quantum correlations.", path: "/experiments/entanglement" },
  { icon: <FlaskConical />, title: "Algorithms", description: "Explore quantum computational methods.", path: "/experiments/grover" }
];

export default function Dashboard() {
  return (
    <section className="dashboard-page">
      <div className="dashboard-hero">
        <div>
          <span className="eyebrow">Quantum Learning Portal</span>
          <h1>Your journey into<span> quantum computing.</span></h1>
          <p>Select a module and start experimenting with quantum concepts through interactive visualizations.</p>
        </div>
        <div className="dashboard-orb"><div /><span>Q</span></div>
      </div>

      <div className="module-grid">
        {modules.map((module, index) => (
          <Link to={module.path} className="module-card" key={module.title}>
            <span className="module-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="module-icon">{module.icon}</div>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            <span className="module-link">Open Module →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}