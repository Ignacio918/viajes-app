// src/components/Navbar.tsx
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logoSmall from '../assets/logo_small.svg'; // Asegúrate de que la ruta sea correcta

const Navbar: FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full h-full px-24 py-8 bg-white flex justify-between items-center shadow-[0px_12px_40px_0px_rgba(0,0,0,0.04)]">
      {/* Logo */}
      <div className="logo-container">
        <img src={logoSmall} alt="zentrip logo" className="logo" />
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/como-funciona" className="nav-link">Cómo Funciona</Link>
        <Link to="/beneficios" className="nav-link">Beneficios</Link>
      </div>

      {/* Auth Links */}
      <div className={`auth-buttons ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
        <Link to="/login" className="login-link">Iniciar Sesión</Link>
        <Link to="/register" className="register-button">Registrarse</Link>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        &#9776; {/* This is the hamburger icon */}
      </div>
    </nav>
  );
};

export default Navbar;