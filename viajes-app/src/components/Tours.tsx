import React, { useEffect } from 'react';
import '../styles/Tours.css';

const Tours: React.FC = () => {
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

  return (
    <div className="tours-container">
      {/* Buscador Principal - usando el formato correcto */}
      <div className="search-main">
        <h2>Busca tours y actividades en cualquier destino</h2>
        <div 
          data-gyg-href="https://widget.getyourguide.com/default/activitiesSearch.frame"
          data-gyg-locale-code="es-ES"
          data-gyg-widget="activities-search"
          data-gyg-partner-id="FRGBT5F">
        </div>
      </div>

      {/* Destinos Populares */}
      <div className="popular-destinations">
        <h3>Destinos Populares</h3>
        <div className="destinations-grid">
          {/* Barcelona */}
          <div className="destination-widget">
            <div 
              data-gyg-href="https://widget.getyourguide.com/default/city.frame"
              data-gyg-location-id="60"
              data-gyg-locale-code="es-ES"
              data-gyg-widget="city"
              data-gyg-partner-id="FRGBT5F">
            </div>
          </div>

          {/* Madrid */}
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
    </div>
  );
};

export default Tours;