import SectionTitle from "../components/SectionTitle";
import BlochSphere from "../components/BlochSphere";
import GateSimulator from "../components/GateSimulator";
import QuantumCircuit from "../components/QuantumCircuit";
import TwoQubitEntanglement from "../components/TwoQubitEntanglement";

export default function Explore(){
 return <section className="page"><SectionTitle eyebrow="Interactive Laboratory" title="Explore quantum behavior" description="Every control below changes something visible. Try a gate, move a qubit, build a circuit or create entanglement."/>
 <div className="explore-grid"><BlochSphere/><GateSimulator/></div>
 <div className="wide-section"><QuantumCircuit/></div>
 <div className="wide-section"><TwoQubitEntanglement/></div>
 </section>;
}