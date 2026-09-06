import { Link } from "react-router-dom";
import { ArrowRight, Atom, BrainCircuit, CircuitBoard, Sparkles } from "lucide-react";
import ParticleField from "../components/ParticleField";
import SectionTitle from "../components/SectionTitle";
import QuantumCard from "../components/QuantumCard";
import QubitVisualizer from "../components/QubitVisualizer";

const features = [
  { icon: <Atom />, title: "Qubits", description: "Understand the fundamental unit of quantum information." },
  { icon: <CircuitBoard />, title: "Quantum Gates", description: "Build circuits using quantum operations and transformations." },
  { icon: <BrainCircuit />, title: "Algorithms", description: "Explore the ideas behind modern quantum algorithms." }
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <ParticleField />
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />

        <div className="hero-content">
          <span className="hero-kicker"><Sparkles size={16} /> Interactive Quantum Computing Laboratory</span>
          <h1>Enter the world of<span> Quantum Computing.</span></h1>
          <p>Learn quantum concepts, visualize qubits, build circuits and experiment with quantum algorithms through an interactive digital laboratory.</p>
          <div className="hero-actions">
            <Link to="/dashboard" className="primary-button">Enter Atelier <ArrowRight size={18} /></Link>
            <Link to="/explore" className="secondary-button">Explore Quantum Systems</Link>
          </div>
          <div className="hero-stats">
            <div><strong>10+</strong><span>Experiments</span></div>
            <div><strong>06</strong><span>Core Concepts</span></div>
            <div><strong>∞</strong><span>States to Explore</span></div>
          </div>
        </div>

        <div className="hero-visual"><QubitVisualizer /></div>
      </section>

      <section className="section">
        <SectionTitle eyebrow="Start Here" title="From classical bits to quantum states" description="Build your understanding progressively through visual explanations and interactive experiments." />
        <div className="card-grid three">
          {features.map((feature) => <QuantumCard key={feature.title} {...feature} />)}
        </div>
      </section>

      <section className="intro-section">
        <div><span className="eyebrow">The Quantum Shift</span><h2>Computing with the<span> rules of nature.</span></h2></div>
        <p>Classical computers process information using bits. Quantum computers use quantum states, allowing entirely new approaches to representing and manipulating information.</p>
      </section>
    </>
  );
}