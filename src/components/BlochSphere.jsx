import { useMemo, useState } from "react";

export default function BlochSphere() {
  const [theta, setTheta] = useState(45);
  const [phi, setPhi] = useState(45);

  const vector = useMemo(() => {
    const t = (theta * Math.PI) / 180;
    const p = (phi * Math.PI) / 180;
    return {
      x: Math.sin(t) * Math.cos(p),
      y: Math.sin(t) * Math.sin(p),
      z: Math.cos(t),
    };
  }, [theta, phi]);

  return (
    <div className="bloch-card">
      <div className="bloch-header">
        <div><span className="eyebrow">Qubit State</span><h3>Bloch Sphere</h3></div>
        <span className="state-badge">|ψ⟩</span>
      </div>

      <div className="sphere-stage">
        <div
          className="sphere"
          style={{ transform: `rotateX(${18 - vector.y * 15}deg) rotateY(${-25 + vector.x * 25}deg)` }}
        >
          <div className="sphere-line horizontal" />
          <div className="sphere-line vertical" />
          <div
            className="state-vector"
            style={{ transform: `rotateY(${phi}deg) rotateX(${theta}deg)` }}
          >
            <span />
          </div>
          <span className="sphere-label north">|0⟩</span>
          <span className="sphere-label south">|1⟩</span>
        </div>
      </div>

      <div className="bloch-controls">
        <label>
          <span>θ — Polar angle</span>
          <strong>{theta}°</strong>
          <input type="range" min="0" max="180" value={theta} onChange={(e) => setTheta(Number(e.target.value))} />
        </label>
        <label>
          <span>φ — Azimuthal angle</span>
          <strong>{phi}°</strong>
          <input type="range" min="0" max="360" value={phi} onChange={(e) => setPhi(Number(e.target.value))} />
        </label>
      </div>

      <div className="vector-values">
        <span>X {vector.x.toFixed(2)}</span>
        <span>Y {vector.y.toFixed(2)}</span>
        <span>Z {vector.z.toFixed(2)}</span>
      </div>
    </div>
  );
}