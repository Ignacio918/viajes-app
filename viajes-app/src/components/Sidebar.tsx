import type React from "react"
import { useState } from "react"
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
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden flex justify-between items-center bg-white p-4 h-16 w-full">
        <div className="flex items-center gap-1">
          <img src={logoIcon || "/placeholder.svg"} alt="Zentrip Logo" className="w-8 h-8" />
          <span className="text-2xl font-extrabold text-[#161616]">zentrip</span>
          <span className="w-1 h-1 bg-[#E61C5D] rounded-full"></span>
        </div>
        <button onClick={toggleSidebar} className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] rounded-full">
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#161616"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6.25H21V7.75H3V6.25ZM3 11.25H21V12.75H3V11.25ZM3 16.25H21V17.75H3V16.25Z" fill="#161616" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""} md:translate-x-0`}>
        <div className="logo-container flex">
          {" "}
          {/* Updated line */}
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
    </>
  )
}

export default Sidebar

