// src/components/Navbar.tsx
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <span className="logo">zentrip</span>
        <div className="logo-dot" />
      </div>

      {/* Hamburger Menu Icon */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        &#9776; {/* This is the hamburger icon */}
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/como-funciona" className="nav-link">Cómo funciona</Link>
        <Link to="/beneficios" className="nav-link">Beneficios</Link>
        <Link to="/contacto" className="nav-link">Contacto</Link>
      </div>

      {/* Auth Links */}
      <div className={`auth-buttons ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/login" className="nav-link">
          Iniciar Sesión
        </Link>
        <Link to="/register" className="register-button">
          Registrarse
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;