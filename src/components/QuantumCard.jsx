import { Link } from "react-router-dom";

export default function QuantumCard({ icon, title, description, tag, onClick, to }) {
  const cardContent = (
    <>
      {icon && <div className="card-icon">{icon}</div>}
      {tag && <span className="card-tag">{tag}</span>}
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="card-arrow">Explore →</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className="quantum-card" onClick={onClick}>
        {cardContent}
      </Link>
    );
  }

  return (
    <article className="quantum-card" onClick={onClick}>
      {cardContent}
    </article>
  );
}