import type React from "react"
import { NavLink } from "react-router-dom"

interface DashboardMenuItemProps {
  to: string
  icon: string
  label: string
  isDisabled?: boolean
}

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({ to, icon, label, isDisabled }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `dashboard-menu-item ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}`}
    >
      <img src={icon || "/placeholder.svg"} alt={`${label} icon`} className="menu-icon" />
      <span className="menu-text">{label}</span>
    </NavLink>
  )
}

export default DashboardMenuItem

