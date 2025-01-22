import React from "react"
import { NavLink } from "react-router-dom"

interface DashboardMenuItemProps {
  to: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
  isDisabled?: boolean
}

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({ to, icon, label, isActive, isDisabled }) => {
  const baseClasses = "w-full py-2 px-2.5 flex items-center gap-3.5 rounded-[20px] transition-colors duration-200"
  const activeClasses = "text-[#E61C5D]"
  const hoverClasses = "hover:bg-[#F3F4F6]"
  const disabledClasses = "text-[#828282] cursor-not-allowed"

  return (
    <NavLink
      to={to}
      className={({ isActive: linkIsActive }) =>
        `${baseClasses} ${isActive || linkIsActive ? activeClasses : hoverClasses} ${isDisabled ? disabledClasses : ""}`
      }
    >
      <div className="w-5 h-5 flex justify-center items-center">
        {React.cloneElement(icon as React.ReactElement, {
          className: `w-[17.92px] h-[17.61px] ${
            isActive ? "text-[#E61C5D]" : isDisabled ? "text-[#828282]" : "text-[#161616]"
          }`,
        })}
      </div>
      <span
        className={`text-base font-normal ${
          isActive ? "text-[#E61C5D]" : isDisabled ? "text-[#828282]" : "text-[#161616]"
        }`}
      >
        {label}
      </span>
    </NavLink>
  )
}

export default DashboardMenuItem

