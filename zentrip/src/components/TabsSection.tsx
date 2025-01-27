import React, { useState } from 'react';
import Tours from './Tours';
import Flights from './Flights';
import TripMap from './TripMap';

const TabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState<any[]>([]);

  const handlePlacesSearch = () => {
    console.log('Buscando:', searchQuery);
    // Aquí agregaremos la lógica de búsqueda más adelante
    // Por ahora solo para testing
    setLocations([
      {
        id: '1',
        name: 'Lugar de prueba',
        coordinates: [-34.6037, -58.3816],
        day: 1,
        description: 'Descripción de prueba'
      }
    ]);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-navigation">
        {['search', 'tours', 'flights', 'places'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="tabs-content">
        {activeTab === 'search' && (
          <div className="search-form">
            <input
              type="text"
              className="destination-input"
              placeholder="¿A dónde vas?"
            />
            <input type="date" className="date-input" />
            <button className="search-button">Buscar</button>
          </div>
        )}

        {activeTab === 'places' && (
          <div className="places-content">
            <div className="search-form mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="destination-input"
                placeholder="¿A dónde quieres ir?"
              />
              <button 
                onClick={handlePlacesSearch}
                className="search-button"
              >
                Buscar
              </button>
            </div>
            
            {/* Contenedor del mapa */}
            <div className="map-container h-[400px] rounded-lg overflow-hidden">
              <TripMap 
                locations={locations}
                selectedDay={1}
                onLocationClick={(location) => console.log('Location clicked:', location)}
              />
            </div>
          </div>
        )}

        {activeTab === 'tours' && <Tours />}
        {activeTab === 'flights' && <Flights />}
      </div>
    </div>
  );
};

export default TabsSection;
