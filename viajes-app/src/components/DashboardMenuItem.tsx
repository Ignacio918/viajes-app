import type React from "react"
import { NavLink, useLocation } from "react-router-dom"

interface DashboardMenuItemProps {
  to: string
  icon: string
  label: string
}

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({ to, icon, label }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <NavLink to={to} className={`dashboard-menu-item ${isActive ? "active" : ""}`}>
      <img src={icon || "/placeholder.svg"} alt={`${label} icon`} className={`menu-icon ${isActive ? "active" : ""}`} />
      <span className="menu-text">{label}</span>
    </NavLink>
  )
}

export default DashboardMenuItem

