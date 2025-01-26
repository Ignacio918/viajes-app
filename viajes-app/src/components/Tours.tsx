import React, { useEffect } from 'react';
import './Tours.css';

const Tours: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
    script.async = true;
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
      <div className="tours-header">
        <h1>Descubre Experiencias Únicas</h1>
        <p>Encuentra los mejores tours y actividades</p>
      </div>

      <div className="tours-grid">
        <div className="tours-search">
          <h2>Busca tu próxima aventura</h2>
          <div 
            data-gyg-href="https://widget.getyourguide.com/default/searchbox.frame"
            data-gyg-locale-code="es-ES" 
            data-gyg-widget="searchbox"
            data-gyg-partner-id="FRGBT5F">
          </div>
        </div>

        <div className="tours-city">
          <h2>Barcelona</h2>
          <div 
            data-gyg-href="https://widget.getyourguide.com/default/city.frame"
            data-gyg-location-id="60"
            data-gyg-locale-code="es-ES"
            data-gyg-widget="city"
            data-gyg-partner-id="FRGBT5F">
          </div>
        </div>

        <div className="tours-city">
          <h2>Madrid</h2>
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
  );
};

export default Tours;