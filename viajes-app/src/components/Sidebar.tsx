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
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 flex items-center gap-1">
        <NavLink to="/dashboard" className="flex items-center gap-1">
          <img src={logoIcon || "/placeholder.svg"} alt="Zentrip Logo" className="w-8 h-8" />
          <span className="text-2xl font-extrabold text-gray-900">zentrip</span>
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
        </NavLink>
      </div>
      <nav className="flex-grow px-4 py-2">
        <DashboardMenuItem
          to="/dashboard"
          icon={<img src={miViajeIcon || "/placeholder.svg"} alt="Mi Viaje" />}
          label="Mi Viaje"
          isActive={true}
        />
        <DashboardMenuItem
          to="/dashboard/itinerario"
          icon={<img src={itinerarioIcon || "/placeholder.svg"} alt="Itinerario" />}
          label="Itinerario"
        />
        <DashboardMenuItem
          to="/dashboard/transportes"
          icon={<img src={transportesIcon || "/placeholder.svg"} alt="Transportes" />}
          label="Transportes"
        />
        <DashboardMenuItem
          to="/dashboard/presupuesto"
          icon={<img src={presupuestoIcon || "/placeholder.svg"} alt="Presupuesto" />}
          label="Presupuesto"
        />
        <DashboardMenuItem
          to="/dashboard/lugares"
          icon={<img src={lugaresIcon || "/placeholder.svg"} alt="Lugares" />}
          label="Lugares"
        />
      </nav>
      <div className="p-4 border-t border-gray-200">
        <DashboardMenuItem
          to="/logout"
          icon={<img src={cerrarSesionIcon || "/placeholder.svg"} alt="Cerrar Sesión" />}
          label="Cerrar Sesión"
        />
      </div>
    </aside>
  )
}

export default Sidebar

