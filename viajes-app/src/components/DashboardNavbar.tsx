import type React from "react"
import { Bell } from "lucide-react"
import "../styles/Dashboard.css"

interface DashboardNavbarProps {
  pageName: string
  userName?: string
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ pageName, userName = "U" }) => {
  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-navbar__title">{pageName}</div>
      <div className="dashboard-navbar__actions">
        <button className="dashboard-navbar__notification-btn" aria-label="Notificaciones">
          <Bell className="dashboard-navbar__notification-icon" />
        </button>
        <div className="dashboard-navbar__avatar">{userName.charAt(0).toUpperCase()}</div>
      </div>
    </nav>
  )
}

export default DashboardNavbar


