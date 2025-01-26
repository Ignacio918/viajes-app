import React, { useState } from 'react';
import '../styles/Tours.css';

type CityId = '60' | '62' | '63' | '70' | '65';
type CityName = 'barcelona' | 'madrid' | 'paris' | 'roma' | 'londres';

interface CitiesMap {
  [key: string]: CityId;
}

const Tours: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityId>('60'); // Default Barcelona

  // Mapeo de ciudades con sus IDs de GetYourGuide
  const cities: CitiesMap = {
    'barcelona': '60',
    'madrid': '62',
    'paris': '63',
    'roma': '70',
    'londres': '65',
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = (e.currentTarget.elements.namedItem('citySearch') as HTMLInputElement).value.toLowerCase();
    
    if (searchInput in cities) {
      setSelectedCity(cities[searchInput]);
    } else {
      alert('Ciudad no encontrada. Por favor, intenta con otra ciudad.');
    }
  };

  return (
    <div className="tours-container">
      {/* Nuestro buscador personalizado */}
      <div className="custom-search">
        <h2>Busca tours y actividades</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            name="citySearch"
            placeholder="Escribe una ciudad..." 
            className="search-input"
            list="cities-list"
          />
          <datalist id="cities-list">
            {Object.keys(cities).map(city => (
              <option key={city} value={city.charAt(0).toUpperCase() + city.slice(1)} />
            ))}
          </datalist>
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>
      </div>

      {/* Widget de la ciudad seleccionada */}
      <div className="selected-city-tours">
        <div 
          data-gyg-href="https://widget.getyourguide.com/default/city.frame"
          data-gyg-location-id={selectedCity}
          data-gyg-locale-code="es-ES"
          data-gyg-widget="city"
          data-gyg-partner-id="FRGBT5F">
        </div>
      </div>
    </div>
  );
};

export default Tours;