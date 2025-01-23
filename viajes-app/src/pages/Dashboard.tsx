import type React from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import DashboardNavbar from "../components/DashboardNavbar"
import "../styles/Dashboard.css"

const Dashboard: React.FC = () => {
  const location = useLocation()
  const pageName = getPageName(location.pathname)

  // Esto es un placeholder. En una implementación real, obtendrías el nombre del usuario de tu estado global o contexto.
  const userName = "Usuario"

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <DashboardNavbar pageName={pageName} userName={userName} />
        <div className="dashboard-content__main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const getPageName = (pathname: string): string => {
  const path = pathname.split("/").pop() || ""
  switch (path) {
    case "dashboard":
      return "Mi Viaje"
    case "itinerario":
      return "Itinerario"
    case "transportes":
      return "Transportes"
    case "presupuesto":
      return "Presupuesto y Gastos"
    case "lugares":
      return "Lugares y Actividades"
    default:
      return "Dashboard"
  }
}

export default Dashboard

