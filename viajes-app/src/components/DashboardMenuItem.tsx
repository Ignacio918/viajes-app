import type React from "react"
import { NavLink } from "react-router-dom"

interface DashboardMenuItemProps {
  to: string
  icon: string
  label: string
  isActive?: boolean
}

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive: navActive }) => `dashboard-menu-item ${navActive || isActive ? "active" : ""}`}
    >
      <img src={icon || "/placeholder.svg"} alt={`${label} icon`} className="menu-icon" />
      <span className="menu-text">{label}</span>
    </NavLink>
  )
}

export default DashboardMenuItem

