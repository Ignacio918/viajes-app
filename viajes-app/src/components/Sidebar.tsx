// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink 
                            to="/dashboard" 
                            className={({ isActive }) => 
                                isActive ? "active" : "inactive"
                            }
                        >
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/dashboard/actividades" 
                            className={({ isActive }) => 
                                isActive ? "active" : "inactive"
                            }
                        >
                            Actividades
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/dashboard/traslados" 
                            className={({ isActive }) => 
                                isActive ? "active" : "inactive"
                            }
                        >
                            Traslados
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/dashboard/vuelos" 
                            className={({ isActive }) => 
                                isActive ? "active" : "inactive"
                            }
                        >
                            Vuelos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/dashboard/hoteles" 
                            className={({ isActive }) => 
                                isActive ? "active" : "inactive"
                            }
                        >
                            Hoteles
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/dashboard/chat-ai" 
                            className={({ isActive }) => 
                                isActive ? "active" : "inactive"
                            }
                        >
                            Chat AI
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;