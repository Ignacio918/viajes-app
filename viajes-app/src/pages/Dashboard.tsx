import type React from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import DashboardNavbar from "../components/DashboardNavbar"
import "../styles/Dashboard.css"
import { useEffect, useState } from "react"

type User = {
  name: string
  tripDate: Date
}

const Dashboard: React.FC = () => {
  const location = useLocation()
  const pageName = getPageName(location.pathname)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Aquí normalmente harías una llamada a tu API para obtener los datos del usuario
    // Por ahora, usaremos datos de ejemplo
    setUser({
      name: "Ignacio",
      tripDate: new Date("2023-12-31"), // Fecha ejemplo del viaje
    })
  }, [])

  const calculateDaysRemaining = (tripDate: Date): number => {
    const today = new Date()
    const timeDiff = tripDate.getTime() - today.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <DashboardNavbar pageName={pageName} userName={user?.name || "Usuario"} />
        <div className="dashboard-content__main">
          {user && (
            <div className="dashboard-header">
              <h1 className="dashboard-header__title">
                ¡Hola, <span className="user-name">{user.name}</span>!
              </h1>
              <p className="dashboard-header__subtitle">
                Faltan <span className="days-remaining">{calculateDaysRemaining(user.tripDate)}</span> días para tu
                viaje soñado.
              </p>
            </div>
          )}
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

