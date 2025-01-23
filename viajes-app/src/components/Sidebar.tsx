import type React from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import "../styles/Sidebar.css"
import logoIcon from "../assets/logo_small.svg"
import miViajeIcon from "../assets/icons/mi-viaje.svg"
import itinerarioIcon from "../assets/icons/icon-calendar.svg"
import transportesIcon from "../assets/icons/icon-airplane.svg"
import presupuestoIcon from "../assets/icons/icon-graph.svg"
import lugaresIcon from "../assets/icons/icon-map-sidebar.svg"
import cerrarSesionIcon from "../assets/icons/icon-logout.svg"

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className="mobile-header">
        <button onClick={toggleSidebar} className="toggle-button">
          {isOpen ? (
            <svg className="close-icon" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6L18 18" />
            </svg>
          ) : (
            <svg className="menu-icon" viewBox="0 0 24 24">
              <path d="M3 6.25H21V7.75H3V6.25ZM3 11.25H21V12.75H3V11.25ZM3 16.25H21V17.75H3V16.25Z" />
            </svg>
          )}
        </button>
        <div className="logo-container-mobile">
          <img src={logoIcon || "/placeholder.svg"} alt="Zentrip Logo" className="logo-mobile" />
        </div>
      </div>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-container hidden md:flex">
          <NavLink to="/dashboard" className="logo-text">
            <img src={logoIcon || "/placeholder.svg"} alt="Zentrip Logo" className="logo" />
          </NavLink>
        </div>
        <nav className="menu">
          <NavLink to="/dashboard" className={({ isActive }) => `dashboard-menu-item ${isActive ? "active" : ""}`} end>
            <img src={miViajeIcon || "/placeholder.svg"} alt="Mi Viaje icon" className="menu-icon" />
            <span className="menu-text">Mi Viaje</span>
          </NavLink>
          <NavLink
            to="/dashboard/itinerario"
            className={({ isActive }) => `dashboard-menu-item ${isActive ? "active" : ""}`}
          >
            <img src={itinerarioIcon || "/placeholder.svg"} alt="Itinerario icon" className="menu-icon" />
            <span className="menu-text">Itinerario</span>
          </NavLink>
          <NavLink
            to="/dashboard/transportes"
            className={({ isActive }) => `dashboard-menu-item ${isActive ? "active" : ""}`}
          >
            <img src={transportesIcon || "/placeholder.svg"} alt="Transportes icon" className="menu-icon" />
            <span className="menu-text">Transportes</span>
          </NavLink>
          <NavLink
            to="/dashboard/presupuesto"
            className={({ isActive }) => `dashboard-menu-item ${isActive ? "active" : ""}`}
          >
            <img src={presupuestoIcon || "/placeholder.svg"} alt="Presupuesto icon" className="menu-icon" />
            <span className="menu-text">Presupuesto y Gastos</span>
          </NavLink>
          <NavLink
            to="/dashboard/lugares"
            className={({ isActive }) => `dashboard-menu-item ${isActive ? "active" : ""}`}
          >
            <img src={lugaresIcon || "/placeholder.svg"} alt="Lugares icon" className="menu-icon" />
            <span className="menu-text">Lugares y Actividades</span>
          </NavLink>
        </nav>
        <div className="logout">
          <NavLink to="/logout" className={({ isActive }) => `dashboard-menu-item ${isActive ? "active" : ""}`}>
            <img src={cerrarSesionIcon || "/placeholder.svg"} alt="Cerrar Sesión icon" className="menu-icon" />
            <span className="menu-text">Cerrar Sesión</span>
          </NavLink>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

