// src/pages/Dashboard.tsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Bienvenido al Dashboard de Zentrip</h1>
                <p>Aquí podrás ver un resumen de tu viaje planeado y acceder a las diferentes secciones.</p>
            </div>
        </div>
    );
};

export default Dashboard;