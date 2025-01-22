// src/components/Sidebar.tsx
import type React from "react"
import { NavLink } from "react-router-dom"
import "../styles/Sidebar.css"
import logoIcon from "../assets/zentrip-logo-navegador.svg"
import miViajeIcon from "../assets/icons/mi-viaje.svg"
import itinerarioIcon from "../assets/icons/icon-calendar.svg"
import transportesIcon from "../assets/icons/icon-airplane.svg"
import presupuestoIcon from "../assets/icons/icon-graph.svg"
import lugaresIcon from "../assets/icons/icon-map-sidebar.svg"
import cerrarSesionIcon from "../assets/icons/icon-logout.svg"
import DashboardMenuItem from "./DashboardMenuItem"

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <NavLink to="/dashboard" className="logo-text">
          <img src={logoIcon || "/placeholder.svg"} alt="Zentrip Logo" className="logo" />
          <span className="logo-name">zentrip</span>
          <span className="logo-dot"></span>
        </NavLink>
      </div>
      <nav className="menu">
        <DashboardMenuItem to="/dashboard" icon={miViajeIcon} label="Mi Viaje" />
        <DashboardMenuItem to="/dashboard/itinerario" icon={itinerarioIcon} label="Itinerario" />
        <DashboardMenuItem to="/dashboard/transportes" icon={transportesIcon} label="Transportes" />
        <DashboardMenuItem to="/dashboard/presupuesto" icon={presupuestoIcon} label="Presupuesto y Gastos" />
        <DashboardMenuItem to="/dashboard/lugares" icon={lugaresIcon} label="Lugares y Actividades" />
      </nav>
      <div className="logout">
        <DashboardMenuItem to="/logout" icon={cerrarSesionIcon} label="Cerrar Sesión" />
      </div>
    </aside>
  )
}

export default Sidebar

