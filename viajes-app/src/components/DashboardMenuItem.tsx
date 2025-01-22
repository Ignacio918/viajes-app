import type React from "react"
import { NavLink } from "react-router-dom"

interface DashboardMenuItemProps {
  to: string
  icon: string
  label: string
}

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink to={to} className={({ isActive }) => `dashboard-menu-item ${isActive ? "active" : ""}`}>
      {({ isActive }) => (
        <>
          <img
            src={icon || "/placeholder.svg"}
            alt={`${label} icon`}
            className={`menu-icon ${isActive ? "active" : ""}`}
          />
          <span className="menu-text">{label}</span>
        </>
      )}
    </NavLink>
  )
}

export default DashboardMenuItem

