import React, { useEffect } from 'react';
import '../styles/Tours.css';

const Tours: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
    script.async = true;
    script.setAttribute('data-gyg-partner-id', 'FRGBT5F');
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="tours-widget-container">
      {/* Buscador de Tours */}
      <div className="tours-search-section">
        <h2>Busca tu próxima aventura</h2>
        <div 
          data-gyg-href="https://widget.getyourguide.com/default/activitiesSearch.frame"
          data-gyg-locale-code="es-ES"
          data-gyg-widget="activities-search"
          data-gyg-partner-id="FRGBT5F"
        ></div>
      </div>

      {/* Sección de ciudades populares */}
      <div className="tours-popular-section">
        <h3>Destinos Populares</h3>
        <div className="tours-grid">
          <div className="tour-city-card">
            <h4>Barcelona</h4>
            <div 
              data-gyg-href="https://widget.getyourguide.com/default/city.frame"
              data-gyg-location-id="60"
              data-gyg-widget="city"
              data-gyg-partner-id="FRGBT5F"
              data-gyg-locale-code="es-ES"
            ></div>
          </div>

          <div className="tour-city-card">
            <h4>Madrid</h4>
            <div 
              data-gyg-href="https://widget.getyourguide.com/default/city.frame"
              data-gyg-location-id="62"
              data-gyg-widget="city"
              data-gyg-partner-id="FRGBT5F"
              data-gyg-locale-code="es-ES"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tours;