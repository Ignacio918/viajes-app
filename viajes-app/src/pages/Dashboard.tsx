import type React from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import DashboardNavbar from "../components/DashboardNavbar"
import "../styles/Dashboard.css"
import { useEffect, useState } from "react"

type Usuario = {
  name: string
  tripDate: Date
}

const Dashboard: React.FC = () => {
  const location = useLocation()
  const pageName = getPageName(location.pathname)
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const obtenerInfoUsuarioViaje = async () => {
      try {
        const response = await fetch('/api/user-trip-info?userId=your-user-id') // Asegúrate de reemplazar 'your-user-id' con el ID del usuario correspondiente.
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue satisfactoria')
        }
        const data = await response.json()
        setUsuario({
          name: data.name,
          tripDate: new Date(data.trip_date)
        })
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('Error desconocido')
        }
      }
    }

    obtenerInfoUsuarioViaje()
  }, [])

  const calculateDaysRemaining = (tripDate: Date): number => {
    const today = new Date()
    const timeDiff = tripDate.getTime() - today.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!usuario) {
    return <div>Cargando...</div>
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <DashboardNavbar pageName={pageName} userName={usuario.name || "Usuario"} />
        <div className="dashboard-content__main">
          {usuario && (
            <div className="dashboard-header">
              <h1 className="dashboard-header__title">
                ¡Hola, <span className="user-name">{usuario.name}</span>!
              </h1>
              <p className="dashboard-header__subtitle">
                Faltan <span className="days-remaining">{calculateDaysRemaining(usuario.tripDate)}</span> días para tu
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