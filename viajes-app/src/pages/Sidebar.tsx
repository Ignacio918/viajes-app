import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/settings">Settings</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;