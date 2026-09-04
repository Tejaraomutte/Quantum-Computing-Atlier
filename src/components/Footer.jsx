import { Atom } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div className="brand-icon"><Atom size={20} /></div>
        <div><strong>Quantum Atelier</strong><span>Interactive Quantum Computing Laboratory</span></div>
      </div>
      <p>Learn quantum computing by seeing the state change, building circuits and experimenting with quantum behavior.</p>
      <div className="footer-bottom"><span>© 2026 Quantum Computing Atelier</span><span>Learn • Simulate • Discover</span></div>
    </footer>
  );
}