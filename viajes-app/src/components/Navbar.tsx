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
        <div className="logo">zentrip</div>
        <div className="logo-dot" />
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/como-funciona" className="nav-link">Cómo Funciona</Link>
        <Link to="/beneficios" className="nav-link">Beneficios</Link>
      </div>

      {/* Auth Links */}
      <div className={`auth-buttons ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
        <Link to="/login" className="auth-button">Iniciar Sesión</Link>
        <Link to="/register" className="auth-button register-button">Registrarse</Link>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        &#9776; {/* This is the hamburger icon */}
      </div>
    </nav>
  );
};

export default Navbar;