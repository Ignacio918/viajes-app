import type React from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import "../styles/Dashboard.css"

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard

