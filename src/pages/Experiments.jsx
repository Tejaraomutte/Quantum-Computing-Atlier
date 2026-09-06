import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { experiments } from "../data/experiments";
import SectionTitle from "../components/SectionTitle";

export default function Experiments() {
  return (
    <section className="page">
      <SectionTitle eyebrow="Virtual Laboratory" title="Quantum experiments" description="Learn by doing. Each experiment combines theory with an interactive simulation." />
      <div className="experiment-list">
        {experiments.map((experiment) => (
          <Link to={`/experiments/${experiment.id}`} className="experiment-row" key={experiment.id}>
            <span className="experiment-number">{experiment.number}</span>
            <div className="experiment-main">
              <span>{experiment.category}</span><h3>{experiment.title}</h3><p>{experiment.description}</p>
            </div>
            <div className="experiment-meta"><span>{experiment.level}</span><ArrowUpRight /></div>
          </Link>
        ))}
      </div>
    </section>
  );
}