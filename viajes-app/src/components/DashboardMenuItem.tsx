// src/components/DashboardMenuItem.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

interface DashboardMenuItemProps {
  to: string;
  icon: string;
  label: string;
  isDisabled?: boolean;
}

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({ to, icon, label, isDisabled = false }) => {
  const baseClasses = "w-full h-full px-2 py-2 flex justify-start items-center gap-3 transition-all";
  const activeClasses = "text-red-500";
  const hoverClasses = "hover:bg-gray-100 hover:rounded-xl";
  const disabledClasses = "text-gray-500 cursor-not-allowed";

  return (
    <NavLink
      to={isDisabled ? "" : to}
      className={({ isActive }) =>
        `${baseClasses} ${hoverClasses} ${isDisabled ? disabledClasses : isActive ? activeClasses : ""}`
      }
      style={isDisabled ? { pointerEvents: "none" } : {}}
    >
      <img src={icon} alt={`${label} icon`} className="w-5 h-5" />
      <span className="text-base font-normal">{label}</span>
    </NavLink>
  );
};

export default DashboardMenuItem;