// src/components/Sidebar.tsx
import React from 'react';
import '../styles/Sidebar.css';
import logoIcon from '../assets/zentrip-logo-navegador.svg';
import miViajeIcon from '../assets/icons/mi-viaje.svg';
import itinerarioIcon from '../assets/icons/icon-calendar.svg';
import transportesIcon from '../assets/icons/icon-airplane.svg';
import presupuestoIcon from '../assets/icons/icon-graph.svg';
import lugaresIcon from '../assets/icons/icon-map-sidebar.svg';
import cerrarSesionIcon from '../assets/icons/icon-logout.svg';
import DashboardMenuItem from './DashboardMenuItem';

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
        <DashboardMenuItem
          to="/dashboard"
          icon={miViajeIcon}
          label="Mi Viaje"
          isDisabled={false}
        />
        <DashboardMenuItem
          to="/dashboard/itinerario"
          icon={itinerarioIcon}
          label="Itinerario"
          isDisabled={false}
        />
        <DashboardMenuItem
          to="/dashboard/transportes"
          icon={transportesIcon}
          label="Transportes"
          isDisabled={false}
        />
        <DashboardMenuItem
          to="/dashboard/presupuesto"
          icon={presupuestoIcon}
          label="Presupuesto y Gastos"
          isDisabled={false}
        />
        <DashboardMenuItem
          to="/dashboard/lugares"
          icon={lugaresIcon}
          label="Lugares y Actividades"
          isDisabled={false}
        />
      </div>
      <div className="logout">
        <DashboardMenuItem
          to="/logout"
          icon={cerrarSesionIcon}
          label="Cerrar Sesión"
          isDisabled={false}
        />
      </div>
    </div>
  );
};

export default Sidebar;