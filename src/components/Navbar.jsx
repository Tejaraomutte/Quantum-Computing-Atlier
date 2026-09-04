import { Link, NavLink } from "react-router-dom";
import { Atom, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Explore", path: "/explore" },
  { name: "Systems", path: "/systems" },
  { name: "Experiments", path: "/experiments" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <span className="brand-icon"><Atom size={21} /></span>
        <span><strong>Quantum</strong><small>Atelier</small></span>
      </Link>
      <nav className={`nav-links ${open ? "open" : ""}`}>
        {links.map((link) => (
          <NavLink key={link.path} to={link.path} end={link.path === "/"} onClick={() => setOpen(false)}>
            {link.name}
          </NavLink>
        ))}
        <Link to="/experiments" className="nav-cta" onClick={() => setOpen(false)}>Start Learning</Link>
      </nav>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}