import type React from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import DashboardNavbar from "../components/DashboardNavbar"
import "../styles/Dashboard.css"
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

type User = {
  name: string
  tripDate: Date
}

const Dashboard: React.FC = () => {
  const location = useLocation()
  const pageName = getPageName(location.pathname)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getUserData = async () => {
      try {
        // Obtener la sesión actual
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) throw sessionError
        
        if (!session) {
          throw new Error('No hay sesión activa')
        }

        // Obtener datos del usuario desde la tabla users
        const { data, error: userError } = await supabase
          .from('users')
          .select('name, trip_date')
          .eq('id', session.user.id)
          .single()

        if (userError) throw userError

        if (!data) {
          throw new Error('No se encontraron datos del usuario')
        }

        setUser({
          name: data.name,
          tripDate: new Date(data.trip_date)
        })
      } catch (error) {
        console.error('Error:', error)
        setError(error instanceof Error ? error.message : 'Error desconocido')
      }
    }

    getUserData()
  }, [])

  const calculateDaysRemaining = (tripDate: Date): number => {
    const today = new Date()
    const timeDiff = tripDate.getTime() - today.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user) {
    return <div>Cargando...</div>
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <DashboardNavbar pageName={pageName} userName={user.name || "Usuario"} />
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