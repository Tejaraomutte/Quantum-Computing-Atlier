import SectionTitle from "../components/SectionTitle";
import BlochSphere from "../components/BlochSphere";
import QuantumCircuit from "../components/QuantumCircuit";
import GateSimulator from "../components/GateSimulator";

export default function Explore() {
  return (
    <section className="page">
      <SectionTitle eyebrow="Interactive Laboratory" title="Explore quantum states" description="Manipulate quantum states and operations directly through interactive visualizations." />
      <div className="explore-grid"><BlochSphere /><GateSimulator /></div>
      <div className="wide-section"><QuantumCircuit /></div>
    </section>
  );
}