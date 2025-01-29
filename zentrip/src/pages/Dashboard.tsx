import React from 'react';
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import DashboardNavbar from "../components/DashboardNavbar"
import TripMap, { Location } from "../components/TripMap"
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
  const [selectedDay, setSelectedDay] = useState<number | undefined>()

  // Estado para las ubicaciones del mapa
  const locations: Location[] = [
    {
      id: '1',
      name: 'Hotel Central',
      coordinates: [-34.6037, -58.3816], // Buenos Aires
      day: 1,
      description: 'Check-in en el hotel'
    },
    {
      id: '2',
      name: 'Plaza de Mayo',
      coordinates: [-34.6083, -58.3712],
      day: 1,
      description: 'Visita al centro histórico'
    },
    {
      id: '3',
      name: 'Puerto Madero',
      coordinates: [-34.6037, -58.3632],
      day: 1,
      description: 'Almuerzo y paseo'
    }
  ]

  // Obtener días únicos de las ubicaciones
  const uniqueDays = [...new Set(locations.map(loc => loc.day))].sort((a, b) => a - b)

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

        // Primero, verificar si existe el usuario
        const { data: existingUser, error: checkError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single()

        if (checkError && checkError.code !== 'PGRST116') {
          console.error('Error al verificar usuario:', checkError)
          throw new Error(`Error al verificar usuario: ${checkError.message}`)
        }

        if (!existingUser) {
          // Si no existe el usuario, lo creamos
          const { data: _newUser, error: insertError } = await supabase
            .from('users')
            .insert([
              {
                id: userId,
                email: userEmail,
                name: userEmail?.split('@')[0] || 'Usuario',
                preferencias: {},
                trip_date: null
              }
            ])
            .select()

          if (insertError) {
            console.error('Error al crear usuario:', insertError)
            throw new Error(`Error al crear usuario: ${insertError.message}`)
          }
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

  const calculateDaysRemaining = (tripDate: Date): number => {
    const today = new Date()
    const timeDiff = tripDate.getTime() - today.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  const renderTripMessage = (): React.ReactNode => {
    if (!user?.tripDate) {
      return (
        <p className="dashboard-header__subtitle">
          ¡Planea tu próxima aventura! <span className="text-[#E61C5D] font-medium">Configura la fecha de tu viaje</span>
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
          {user && location.pathname === '/dashboard' && (
            <>
              <div className="dashboard-header">
                <h1 className="dashboard-header__title">
                  ¡Hola, <span className="user-name">{user.name}</span>!
                </h1>
                {renderTripMessage()}
              </div>

              <div className="trip-section mt-8 px-6">
                <h2 className="text-2xl font-bold mb-6 text-[#E61C5D]">Mi Itinerario</h2>
                
                {/* Filtros de días */}
                <div className="days-filter mb-6">
                  <div className="flex gap-3 flex-wrap">
                    {uniqueDays.map(day => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(selectedDay === day ? undefined : day)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 min-w-[80px]
                          ${selectedDay === day 
                            ? 'bg-[#E61C5D] text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        Día {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid para mapa y lista de ubicaciones */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Mapa */}
                  <div className="lg:col-span-3">
                    <TripMap 
                      locations={locations}
                      selectedDay={selectedDay}
                      onLocationClick={(location) => {
                        console.log('Ubicación seleccionada:', location);
                      }}
                    />
                  </div>

                  {/* Lista de ubicaciones */}
                  <div className="locations-list">
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 sticky top-4">
                      <h3 className="text-lg font-semibold mb-4">
                        {selectedDay ? `Día ${selectedDay}` : 'Todos los días'}
                      </h3>
                      
                      {(selectedDay ? locations.filter(loc => loc.day === selectedDay) : locations)
                        .map(location => (
                          <div 
                            key={location.id}
                            className="location-item"
                          >
                            <h4 className="font-medium text-gray-800">{location.name}</h4>
                            {location.time ? (
                              <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">Hora:</span> {location.time}
                              </p>
                            ) : (
                              <p className="text-sm text-gray-500 mt-2">Hora no especificada</p>
                            )}
                            {location.description && (
                              <p className="text-sm text-gray-500 mt-2">{location.description}</p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
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