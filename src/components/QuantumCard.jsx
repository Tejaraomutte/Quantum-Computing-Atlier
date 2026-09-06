export default function QuantumCard({ icon, title, description, tag, onClick }) {
  return (
    <article className="quantum-card" onClick={onClick}>
      {icon && <div className="card-icon">{icon}</div>}
      {tag && <span className="card-tag">{tag}</span>}
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="card-arrow">Explore →</span>
    </article>
  );
}