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
      <div className="search-section">
        <h2>Encuentra tu próxima aventura</h2>
        <div 
          data-gyg-href="https://widget.getyourguide.com/default/city.frame" 
          data-gyg-location-id="200" 
          data-gyg-locale-code="es-ES" 
          data-gyg-widget="city" 
          data-gyg-partner-id="FRGBT5F">
        </div>
      </div>

      <div className="cities-section">
        <div className="city-widget">
          <h3>Barcelona</h3>
          <div 
            data-gyg-href="https://widget.getyourguide.com/default/city.frame" 
            data-gyg-location-id="60" 
            data-gyg-locale-code="es-ES" 
            data-gyg-widget="city" 
            data-gyg-partner-id="FRGBT5F">
          </div>
        </div>

        <div className="city-widget">
          <h3>Madrid</h3>
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