import { Cpu, Database, Gauge, Radio, Thermometer, Waves } from "lucide-react";

const systems = [
  { icon: <Cpu />, title: "Quantum Processor", description: "The quantum processing unit contains and manipulates physical qubits." },
  { icon: <Thermometer />, title: "Cryogenic Environment", description: "Many quantum systems operate at extremely low temperatures to preserve quantum behavior." },
  { icon: <Radio />, title: "Control Electronics", description: "Classical electronics generate and control the signals used to manipulate qubits." },
  { icon: <Gauge />, title: "Readout System", description: "Measurement systems convert quantum states into classical information." },
  { icon: <Waves />, title: "Quantum Signals", description: "Precisely controlled physical signals perform operations on quantum states." },
  { icon: <Database />, title: "Classical Computer", description: "Classical computation coordinates experiments, control and data analysis." }
];

export default function Systems() {
  return (
    <section className="page">
      <div className="system-hero">
        <span className="eyebrow">Quantum Hardware</span>
        <h1>Inside a<span> quantum computer.</span></h1>
        <p>Understand how quantum processors, control systems and classical computers work together to perform quantum computation.</p>
      </div>

      <div className="system-architecture">
        <div className="architecture-node classical">Classical Computer</div>
        <div className="architecture-line" />
        <div className="architecture-node control">Control Electronics</div>
        <div className="architecture-line" />
        <div className="architecture-node quantum">Quantum Processor</div>
        <div className="architecture-line" />
        <div className="architecture-node readout">Measurement</div>
      </div>

      <div className="system-grid">
        {systems.map((system) => (
          <article className="system-card" key={system.title}>
            <div>{system.icon}</div><h3>{system.title}</h3><p>{system.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}