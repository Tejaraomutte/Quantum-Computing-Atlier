import { Atom } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div className="brand-icon"><Atom size={20} /></div>
        <div>
          <strong>Quantum Atelier</strong>
          <span>Interactive Quantum Computing Laboratory</span>
        </div>
      </div>
      <p>Explore quantum computing through concepts, visualizations and interactive experiments.</p>
      <div className="footer-bottom">
        <span>© 2026 Quantum Computing Atelier</span>
        <span>Learn • Simulate • Discover</span>
      </div>
    </footer>
  );
}