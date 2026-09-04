import { Atom, BrainCircuit, CircuitBoard, FlaskConical, Layers, Orbit } from "lucide-react";
import { Link } from "react-router-dom";
export default function Dashboard(){
 const modules=[
  {icon:<Atom/>,title:"Qubit Fundamentals",description:"Understand |0⟩, |1⟩ and measurement probability.",path:"/experiments/single-qubit"},
  {icon:<Orbit/>,title:"Bloch Sphere",description:"Move the state vector around a live Bloch sphere.",path:"/experiments/bloch-sphere"},
  {icon:<Layers/>,title:"Superposition",description:"Create |+⟩ and watch 50/50 measurement probabilities.",path:"/experiments/superposition"},
  {icon:<CircuitBoard/>,title:"Quantum Gates",description:"Apply X, Y, Z and H transformations.",path:"/experiments/quantum-gates"},
  {icon:<BrainCircuit/>,title:"Entanglement",description:"Create a correlated Bell pair.",path:"/experiments/entanglement"},
  {icon:<FlaskConical/>,title:"Algorithms",description:"Explore teleportation and Grover search.",path:"/experiments/teleportation"}
 ];
 return <section className="dashboard-page"><div className="dashboard-hero"><div><span className="eyebrow">Quantum Learning Portal</span><h1>Your journey into<span> quantum computing.</span></h1><p>Choose a module, interact with the simulation and learn from what changes.</p></div><div className="dashboard-orb"><div/><span>Q</span></div></div><div className="module-grid">{modules.map((m,i)=><Link to={m.path} className="module-card" key={m.title}><span className="module-number">{String(i+1).padStart(2,"0")}</span><div className="module-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.description}</p><span className="module-link">Open Module →</span></Link>)}</div></section>;
}