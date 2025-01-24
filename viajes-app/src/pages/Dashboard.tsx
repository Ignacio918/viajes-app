import type React from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import DashboardNavbar from "../components/DashboardNavbar"
import "../styles/Dashboard.css"
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

type User = {
  name: string
  tripDate: Date | null
}

const Dashboard: React.FC = () => {
  const location = useLocation()
  const pageName = getPageName(location.pathname)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getUserData = async () => {
      try {
        // 1. Verificar sesión
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Error de sesión:', sessionError)
          throw new Error(`Error de sesión: ${sessionError.message}`)
        }
        
        if (!sessionData.session) {
          console.error('No hay sesión activa')
          throw new Error('No hay sesión activa')
        }

        const userId = sessionData.session.user.id
        const userEmail = sessionData.session.user.email
        console.log('ID del usuario:', userId)
        console.log('Email del usuario:', userEmail)

        // Primero, verificar si existe el usuario
        const { data: existingUser, error: checkError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single()

        if (checkError && checkError.code !== 'PGRST116') { // PGRST116 es el código cuando no se encuentra el registro
          console.error('Error al verificar usuario:', checkError)
          throw new Error(`Error al verificar usuario: ${checkError.message}`)
        }

        if (!existingUser) {
          // Si no existe el usuario, lo creamos
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([
              {
                id: userId,
                email: userEmail,
                name: userEmail?.split('@')[0] || 'Usuario',
                preferencias: {},
                trip_date: null // Iniciamos sin fecha de viaje
              }
            ])
            .select()

          if (insertError) {
            console.error('Error al crear usuario:', insertError)
            throw new Error(`Error al crear usuario: ${insertError.message}`)
          }

          console.log('Nuevo usuario creado:', newUser)
        }

        // Obtener datos actualizados del usuario
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('name, trip_date')
          .eq('id', userId)
          .single()

        if (userError) {
          console.error('Error al obtener datos del usuario:', userError)
          throw new Error(`Error al obtener datos del usuario: ${userError.message}`)
        }

        if (!userData) {
          throw new Error('No se encontraron datos del usuario en la base de datos')
        }

        console.log('Datos del usuario obtenidos:', userData)

        setUser({
          name: userData.name,
          tripDate: userData.trip_date ? new Date(userData.trip_date) : null
        })
      } catch (error) {
        console.error('Error completo:', error)
        setError(error instanceof Error ? error.message : 'Error desconocido')
      }
    }

    getUserData()
  }, [])

  const calculateDaysRemaining = (tripDate: Date | null): number | null => {
    if (!tripDate) return null
    const today = new Date()
    const timeDiff = tripDate.getTime() - today.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  const renderTripMessage = (): React.ReactNode => {
    if (!user?.tripDate) {
      return (
        <p className="dashboard-header__subtitle">
          ¡Planea tu próxima aventura! <span className="highlight">Configura la fecha de tu viaje</span>
        </p>
      )
    }

    const daysRemaining = calculateDaysRemaining(user.tripDate)
    return (
      <p className="dashboard-header__subtitle">
        Faltan <span className="days-remaining">{daysRemaining}</span> días para tu viaje soñado.
      </p>
    )
  }

  if (error) {
    return (
      <div className="error-container" style={{ 
        padding: '20px', 
        color: 'red',
        maxWidth: '600px',
        margin: '20px auto',
        textAlign: 'center',
        backgroundColor: '#fff3f3',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Error en el Dashboard:</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{ 
            padding: '8px 16px', 
            marginTop: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reintentar
        </button>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        Cargando...
      </div>
    )
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
              {renderTripMessage()}
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