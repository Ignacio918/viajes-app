import React, { useState, useEffect } from 'react';
import '../styles/Tours.css';

interface CitiesMap {
  [key: string]: {
    id: string;
    name: string;
  };
}

const Tours: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  const cities: CitiesMap = {
    'barcelona': { id: '60', name: 'Barcelona' },
    'madrid': { id: '62', name: 'Madrid' },
    'paris': { id: '63', name: 'París' },
    'roma': { id: '70', name: 'Roma' },
    'londres': { id: '65', name: 'Londres' }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
    script.setAttribute('data-gyg-partner-id', 'FRGBT5F');
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cityKey = searchTerm.toLowerCase();
    
    if (cities[cityKey]) {
      setSelectedCity(cities[cityKey].id);
      setShowResults(true);
    } else {
      alert('Ciudad no encontrada. Por favor, elige una de las ciudades sugeridas.');
    }
  };

  return (
    <div className="tours-container">
      {/* Sección de búsqueda */}
      <div className="search-section">
        <h2>Encuentra las mejores experiencias</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar ciudad..." 
            className="search-input"
            list="cities-list"
          />
          <button type="submit" className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
          <datalist id="cities-list">
            {Object.values(cities).map(city => (
              <option key={city.id} value={city.name} />
            ))}
          </datalist>
        </form>
      </div>

      {/* Destinos Populares */}
      <div className="popular-destinations">
        <h3>Destinos Populares</h3>
        <div className="destinations-grid">
          <div className="destination-widget">
            <div 
              data-gyg-href="https://widget.getyourguide.com/default/city.frame"
              data-gyg-location-id="60"
              data-gyg-locale-code="es-ES"
              data-gyg-widget="city"
              data-gyg-partner-id="FRGBT5F">
            </div>
          </div>
          <div className="destination-widget">
            <div 
              data-gyg-href="https://widget.getyourguide.com/default/city.frame"
              data-gyg-location-id="62"
              data-gyg-locale-code="es-ES"
              data-gyg-widget="city"
              data-gyg-partner-id="FRGBT5F">
            </div>
          </div>
        </div>
      </div>

      {/* Resultados de búsqueda */}
      {showResults && selectedCity && (
        <div className="search-results">
          <div className="widget-container">
            <div 
              data-gyg-href="https://widget.getyourguide.com/default/city.frame"
              data-gyg-location-id={selectedCity}
              data-gyg-locale-code="es-ES"
              data-gyg-widget="city"
              data-gyg-partner-id="FRGBT5F">
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;