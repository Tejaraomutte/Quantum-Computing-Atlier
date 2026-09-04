import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { experiments } from "../data/experiments";
import SectionTitle from "../components/SectionTitle";
export default function Experiments(){
 return <section className="page"><SectionTitle eyebrow="Virtual Laboratory" title="Quantum experiments" description="Each experiment has a learning objective, theory, procedure, interactive simulation, observation and assignment."/>
 <div className="experiment-list">{experiments.map(e=><Link to={`/experiments/${e.id}`} className="experiment-row" key={e.id}><span className="experiment-number">{e.number}</span><div className="experiment-main"><span>{e.category}</span><h3>{e.title}</h3><p>{e.description}</p></div><div className="experiment-meta"><span>{e.level}</span><ArrowUpRight/></div></Link>)}</div></section>;
}