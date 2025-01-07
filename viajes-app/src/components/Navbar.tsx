// src/components/Navbar.tsx
import { FC } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: FC = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <span className="logo">zentrip</span>
        <div className="logo-dot" />
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/como-funciona" className="nav-link">Como funciona</Link>
        <Link to="/beneficios" className="nav-link">Beneficios</Link>
      </div>

      {/* Auth Buttons */}
      <div className="auth-buttons">
        <Link to="/login" className="login-button">
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