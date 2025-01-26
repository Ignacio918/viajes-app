import React, { useEffect } from 'react';
import '../styles/Tours.css';

const Tours: React.FC = () => {
  useEffect(() => {
    // Cargar el script de GetYourGuide
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
      <div className="tours-widget-search">
        <h2>Busca tu próxima aventura</h2>
        <div 
          data-gyg-widget="activities"
          data-gyg-partner-id="FRGBT5F"
          data-gyg-number-of-items="3"
          data-gyg-locale-code="es-ES"
          data-gyg-currency="EUR"
          data-gyg-layout="horizontal"
        ></div>
      </div>

      <div className="tours-widget-grid">
        <div className="tours-widget-city">
          <h2>Barcelona</h2>
          <div 
            data-gyg-widget="activities"
            data-gyg-partner-id="FRGBT5F"
            data-gyg-city-id="60"
            data-gyg-number-of-items="4"
            data-gyg-locale-code="es-ES"
            data-gyg-currency="EUR"
            data-gyg-layout="vertical"
          ></div>
        </div>

        <div className="tours-widget-city">
          <h2>Madrid</h2>
          <div 
            data-gyg-widget="activities"
            data-gyg-partner-id="FRGBT5F"
            data-gyg-city-id="62"
            data-gyg-number-of-items="4"
            data-gyg-locale-code="es-ES"
            data-gyg-currency="EUR"
            data-gyg-layout="vertical"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Tours;