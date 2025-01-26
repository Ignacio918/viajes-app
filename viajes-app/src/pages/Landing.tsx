// src/pages/Landing.tsx
import { FC, useState } from 'react';
import Navbar from '../components/Navbar';
import { BackgroundGradientAnimation } from '../components/ui/BackgroundGradientAnimation';
import Tours from '../components/Tours';
import Places from '../components/Places';
import Flights from '../components/Flights';
import Packages from '../components/Packages';
import Chatbot from '../components/Chatbot';

const Landing: FC = () => {
  const [activeTab, setActiveTab] = useState<'tours' | 'places' | 'flights' | 'packages'>('tours');

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section con Búsqueda Principal */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <BackgroundGradientAnimation>
          <div className="text-center space-y-6 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Descubre tu próximo destino
            </h1>
            
            {/* Tabs de Búsqueda Principal */}
            <div className="bg-white/90 p-6 rounded-xl max-w-4xl mx-auto mt-8">
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setActiveTab('tours')}
                  className={`px-4 py-2 rounded-full ${
                    activeTab === 'tours' ? 'bg-pink-600 text-white' : 'text-gray-600'
                  }`}
                >
                  Tours
                </button>
                {/* Similares botones para Places, Flights, Packages */}
              </div>

              {/* Contenido según tab activo */}
              <div className="mt-4">
                {activeTab === 'tours' && <Tours />}
                {activeTab === 'places' && <Places />}
                {activeTab === 'flights' && <Flights />}
                {activeTab === 'packages' && <Packages />}
              </div>
            </div>
          </div>
        </BackgroundGradientAnimation>
      </section>

      {/* Sección de Destinos Populares */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Destinos Populares</h2>
          <Places />
        </div>
      </section>

      {/* Sección de Tours Destacados */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Tours Destacados</h2>
          <Tours />
        </div>
      </section>

      {/* Chatbot flotante */}
      <div className="fixed bottom-4 right-4 z-50">
        <Chatbot />
      </div>

      {/* CTA para registro */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para planear tu viaje completo?
          </h2>
          <p className="mb-8">
            Registrate para acceder a todas las funcionalidades de planificación
          </p>
          <button
            onClick={() => window.location.href = '/register'}
            className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Crear mi itinerario completo
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;