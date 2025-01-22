// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';
import logoIcon from '../assets/zentrip-logo-navegador.svg';
import miViajeIcon from '../assets/mi-viaje.svg';
import itinerarioIcon from '../assets/itinerario.svg';
import transportesIcon from '../assets/transportes.svg';
import presupuestoIcon from '../assets/presupuesto.svg';
import lugaresIcon from '../assets/lugares.svg';
import cerrarSesionIcon from '../assets/cerrar-sesion.svg';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logoIcon} alt="Zentrip Logo" className="logo" />
        <div className="logo-text">
          <span className="logo-name">zentrip</span>
          <span className="logo-dot"></span>
        </div>
      </div>
      <div className="menu">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          <img src={miViajeIcon} alt="Mi Viaje" className="menu-icon" />
          <span className="menu-text">Mi Viaje</span>
        </NavLink>
        <NavLink to="/dashboard/itinerario" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          <img src={itinerarioIcon} alt="Itinerario" className="menu-icon" />
          <span className="menu-text">Itinerario</span>
        </NavLink>
        <NavLink to="/dashboard/transportes" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          <img src={transportesIcon} alt="Transportes" className="menu-icon" />
          <span className="menu-text">Transportes</span>
        </NavLink>
        <NavLink to="/dashboard/presupuesto" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          <img src={presupuestoIcon} alt="Presupuesto y Gastos" className="menu-icon" />
          <span className="menu-text">Presupuesto y Gastos</span>
        </NavLink>
        <NavLink to="/dashboard/lugares" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          <img src={lugaresIcon} alt="Lugares y Actividades" className="menu-icon" />
          <span className="menu-text">Lugares y Actividades</span>
        </NavLink>
      </div>
      <div className="logout">
        <NavLink to="/logout" className="menu-item">
          <img src={cerrarSesionIcon} alt="Cerrar Sesión" className="menu-icon" />
          <span className="menu-text">Cerrar Sesión</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;