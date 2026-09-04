import { Link } from "react-router-dom";
import { ArrowRight, Atom, BrainCircuit, CircuitBoard, Sparkles } from "lucide-react";
import ParticleField from "../components/ParticleField";
import SectionTitle from "../components/SectionTitle";
import QuantumCard from "../components/QuantumCard";
import QubitVisualizer from "../components/QubitVisualizer";

export default function Home(){
  const features=[
    {icon:<Atom/>,title:"Qubits",description:"Understand quantum information and how a qubit can occupy a superposition."},
    {icon:<CircuitBoard/>,title:"Quantum Gates",description:"Apply real gate transformations and see measurement probabilities update."},
    {icon:<BrainCircuit/>,title:"Algorithms",description:"Follow interactive visual stories for teleportation and quantum search."}
  ];
  return <>
    <section className="hero"><ParticleField/><div className="hero-glow glow-one"/><div className="hero-glow glow-two"/>
      <div className="hero-content"><span className="hero-kicker"><Sparkles size={15}/> Interactive Quantum Computing Laboratory</span>
        <h1>See quantum computing<span> come alive.</span></h1>
        <p>Move quantum states, build circuits, create entanglement and observe probabilities change in real time through a visual virtual laboratory.</p>
        <div className="hero-actions"><Link to="/dashboard" className="primary-button">Enter Atelier <ArrowRight size={18}/></Link><Link to="/explore" className="secondary-button">Open Interactive Lab</Link></div>
        <div className="hero-stats"><div><strong>10</strong><span>Experiments</span></div><div><strong>04</strong><span>Live Simulators</span></div><div><strong>∞</strong><span>States to Explore</span></div></div>
      </div><div className="hero-visual"><QubitVisualizer/></div>
    </section>
    <section className="section"><SectionTitle eyebrow="Start Here" title="Learn by changing the state." description="The laboratory is designed so every important concept has something you can manipulate, observe and explain."/><div className="card-grid three">{features.map(f=><QuantumCard key={f.title} {...f}/>)}</div></section>
    <section className="intro-section"><div><span className="eyebrow">The Quantum Shift</span><h2>Not just information.<span> Interaction.</span></h2></div><p>Classical bits are either 0 or 1. Quantum states use amplitudes and interference, so the most useful way to learn is to experiment with those changes directly.</p></section>
  </>;
}