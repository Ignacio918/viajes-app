import type React from "react"
import { NavLink, useLocation } from "react-router-dom"

interface DashboardMenuItemProps {
  to: string
  icon: string
  label: string
}

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({ to, icon, label }) => {
  const location = useLocation()
  const isActive =
    to === "/dashboard" ? location.pathname === "/dashboard" : location.pathname.startsWith(to) && to !== "/dashboard"

  return (
    <NavLink to={to} className={`dashboard-menu-item ${isActive ? "active" : ""}`}>
      <img src={icon || "/placeholder.svg"} alt={`${label} icon`} className="menu-icon" />
      <span className="menu-text">{label}</span>
    </NavLink>
  )
}

export default DashboardMenuItem

