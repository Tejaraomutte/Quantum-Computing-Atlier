export default function QuantumCard({icon,title,description,tag}) {
  return <article className="quantum-card">
    {icon && <div className="card-icon">{icon}</div>}
    {tag && <span className="card-tag">{tag}</span>}
    <h3>{title}</h3><p>{description}</p><span className="card-arrow">Explore →</span>
  </article>;
}