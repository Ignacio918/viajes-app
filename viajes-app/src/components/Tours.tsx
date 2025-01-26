import React, { useState, useEffect } from 'react';
import '../styles/Tours.css';

interface City {
  id: string;
  name: string;
  displayName: string; // Nombre para mostrar
}

const Tours: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  // Mapeo correcto de ciudades con sus IDs exactos de GetYourGuide
  const cities: { [key: string]: City } = {
    'barcelona': { 
      id: '60', 
      name: 'barcelona',
      displayName: 'Barcelona'
    },
    'madrid': { 
      id: '62', 
      name: 'madrid',
      displayName: 'Madrid'
    }
    // Agregar más ciudades solo cuando tengamos sus IDs exactos verificados
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
    const searchValue = searchTerm.toLowerCase().trim();
    
    // Buscar la ciudad exacta
    const cityFound = cities[searchValue];
    
    if (cityFound) {
      setSelectedCity(cityFound.id);
      setShowResults(true);
      console.log(`Mostrando resultados para ${cityFound.displayName} con ID: ${cityFound.id}`);
    } else {
      alert('Por favor, selecciona una ciudad de la lista sugerida');
      setShowResults(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) {
      setShowResults(false);
    }
  };

  return (
    <div className="tours-container">
      <div className="search-section">
        <h2>Encuentra las mejores experiencias</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleInputChange}
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
              <option key={city.id} value={city.displayName} />
            ))}
          </datalist>
        </form>
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

      {/* Destinos Populares - Solo mostramos cuando no hay resultados de búsqueda */}
      {!showResults && (
        <div className="popular-destinations">
          <h3>Destinos Populares</h3>
          <div className="destinations-grid">
            {Object.values(cities).slice(0, 2).map(city => (
              <div key={city.id} className="destination-widget">
                <div 
                  data-gyg-href="https://widget.getyourguide.com/default/city.frame"
                  data-gyg-location-id={city.id}
                  data-gyg-locale-code="es-ES"
                  data-gyg-widget="city"
                  data-gyg-partner-id="FRGBT5F">
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;