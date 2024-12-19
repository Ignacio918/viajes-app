import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container bg-gray-100 min-h-screen p-4">
      <header className="bg-white shadow-md py-4 px-6 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link to="/" className="btn-primary">
          Ir a la Página de Inicio
        </Link>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Resumen rápido</h2>
          <div className="text-gray-700">
            <p>Próximos viajes: 3</p>
            <p>Documentos cargados: 5</p>
            <p>Estadísticas del viaje actual:</p>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Generador de itinerarios</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Destinos</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Ingrese sus destinos" />
            </div>
            <div>
              <label className="block text-gray-700">Presupuesto</label>
              <input type="number" className="w-full p-2 border rounded" placeholder="Ingrese su presupuesto" />
            </div>
            <div>
              <label className="block text-gray-700">Duración (días)</label>
              <input type="number" className="w-full p-2 border rounded" placeholder="Ingrese la duración del viaje" />
            </div>
            <button type="submit" className="btn-primary">Generar Itinerario</button>
          </form>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Futuras funcionalidades</h2>
          <p className="text-gray-700">Gestión de documentos, Calendario interactivo, Planificador financiero, etc.</p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;