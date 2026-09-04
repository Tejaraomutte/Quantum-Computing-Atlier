import { Link,useParams } from "react-router-dom";
import BlochSphere from "../components/BlochSphere";
import GateSimulator from "../components/GateSimulator";
import QuantumCircuit from "../components/QuantumCircuit";
import TwoQubitEntanglement from "../components/TwoQubitEntanglement";
import Teleportation from "../components/Teleportation";
import GroverDemo from "../components/GroverDemo";
import ProbabilityBars from "../components/ProbabilityBars";
import { experiments } from "../data/experiments";

function Superposition(){return <div className="superposition-lab"><div className="super-orb"><span>H</span><i/><i/><i/><i/></div><div className="super-info"><span className="eyebrow">Apply Hadamard</span><h3>|0⟩ → |+⟩</h3><p>The Hadamard gate creates equal amplitudes for |0⟩ and |1⟩.</p><ProbabilityBars p0={.5} p1={.5}/></div></div>}
function SingleQubit(){return <div className="single-qubit-lab"><div className="basis-state"><button className="basis-zero">0</button><div className="state-arrow">→</div><button className="basis-one">1</button></div><div><span className="eyebrow">Two possible measurement outcomes</span><h3>A classical bit has one definite value; a qubit can be prepared in a general state.</h3><ProbabilityBars p0={1} p1={0}/></div></div>}
function Cnot(){return <div className="cnot-lab"><div className="cnot-circuit"><div><span>q₀</span><b>H</b><b className="control">●</b><span>→ M</span></div><div><span>q₁</span><b className="target">⊕</b><span>→ M</span></div><i/></div><div><span className="eyebrow">Controlled operation</span><h3>CNOT flips the target when the control is |1⟩.</h3><p>With H on the control and CNOT applied to |00⟩, a Bell state is produced.</p></div></div>}
function Bell(){return <div className="bell-lab"><div className="bell-state">|Φ⁺⟩ = <strong>(|00⟩ + |11⟩) / √2</strong></div><div className="bell-pairs"><span>|00⟩ <b>50%</b></span><span>|11⟩ <b>50%</b></span></div></div>}
function QFT(){return <div className="qft-lab"><div className="qft-step active"><b>1</b><span>Input register</span></div><div className="qft-arrow">→</div><div className="qft-step"><b>2</b><span>Hadamard + phases</span></div><div className="qft-arrow">→</div><div className="qft-step"><b>3</b><span>Fourier amplitudes</span></div></div>}

export default function ExperimentDetail(){
 const {id}=useParams(); const e=experiments.find(x=>x.id===id);
 if(!e)return <section className="page not-found"><h1>Experiment not found</h1><Link to="/experiments">Return to experiments</Link></section>;
 let simulation;
 if(id==="single-qubit")simulation=<SingleQubit/>;
 else if(id==="bloch-sphere")simulation=<BlochSphere/>;
 else if(id==="superposition")simulation=<Superposition/>;
 else if(id==="quantum-gates")simulation=<GateSimulator/>;
 else if(id==="entanglement")simulation=<TwoQubitEntanglement/>;
 else if(id==="cnot")simulation=<Cnot/>;
 else if(id==="bell-state")simulation=<Bell/>;
 else if(id==="teleportation")simulation=<Teleportation/>;
 else if(id==="grover")simulation=<GroverDemo/>;
 else simulation=<QFT/>;

 return <section className="experiment-detail">
   <div className="experiment-heading"><span className="eyebrow">Experiment {e.number} • {e.level}</span><h1>{e.title}</h1><p>{e.description}</p></div>
   <div className="learning-grid">
    <article><span>Aim</span><h2>What you will learn</h2><p>Understand the core behavior behind {e.title} and connect the theory to an observable quantum process.</p></article>
    <article><span>Theory</span><h2>Quantum principle</h2><p>Quantum states are described by amplitudes, operations and measurement probabilities rather than only classical 0/1 values.</p></article>
    <article><span>Procedure</span><h2>Interact and observe</h2><p>Use the controls below, change the state or operation, and compare what you see with your prediction.</p></article>
   </div>
   <section className="simulation-section"><div className="simulation-header"><span className="eyebrow">Simulation View</span><h2>Interactive experiment</h2></div>{simulation}</section>
   <div className="observation-box"><span className="eyebrow">Observation</span><h2>What changed?</h2><p>Record the state, probabilities, correlations or algorithm steps you observed. Explain why the result follows from the quantum operation.</p></div>
   <div className="assignment-box"><span className="eyebrow">Assignment</span><h2>Think like a quantum engineer.</h2><p>Modify the experiment, predict the result before running it, then compare your prediction with the simulation.</p></div>
   <div className="references"><span className="eyebrow">References</span><p>Nielsen & Chuang — Quantum Computation and Quantum Information</p><p>IBM Quantum Learning resources</p></div>
 </section>;
}