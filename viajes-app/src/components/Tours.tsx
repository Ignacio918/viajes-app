import React, { useState, useEffect } from 'react';
import '../styles/Tours.css';

interface GYGProvider {
  partnerId: string;
  cityId?: string;
}

interface CivitatisProvider {
  partnerId: string;
}

interface ToursProps {
  providers?: {
    getyourguide?: GYGProvider;
    civitatis?: CivitatisProvider;
  };
}

const defaultProviders: Required<ToursProps>['providers'] = {
  getyourguide: {
    partnerId: import.meta.env.VITE_GYG_PARTNER_ID || ''
  },
  civitatis: {
    partnerId: import.meta.env.VITE_CIVITATIS_PARTNER_ID || ''
  }
};

const Tours: React.FC<ToursProps> = ({ providers = defaultProviders }) => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState('');

  useEffect(() => {
    if (providers.getyourguide) {
      const script = document.createElement('script');
      script.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        const existingScript = document.querySelector(
          'script[src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"]'
        );
        if (existingScript?.parentNode) {
          existingScript.parentNode.removeChild(existingScript);
        }
      };
    }
  }, [providers]);

  return (
    <div className="tours-container">
      <div className="tours-header">
        <h2>Descubre los mejores tours y actividades</h2>
        <p>Explora experiencias únicas en tu destino</p>
      </div>

      <div className="tours-filters">
        <input
          type="text"
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          placeholder="¿A dónde quieres ir?"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <select
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
        >
          <option value="">Número de viajeros</option>
          <option value="1">1 persona</option>
          <option value="2">2 personas</option>
          <option value="3">3 personas</option>
          <option value="4">4+ personas</option>
        </select>
      </div>

      <div className="tours-providers">
        {providers.getyourguide && (
          <div className="provider-section">
            <h3>Tours populares en Barcelona</h3>
            <div
              data-gyg-widget="activities"
              data-gyg-partner-id={providers.getyourguide.partnerId}
              data-gyg-locale-code="es-ES"
              data-gyg-currency="EUR"
              data-gyg-city-id="60"
              data-gyg-max-results="6"
            ></div>
          </div>
        )}

        {providers.getyourguide && (
          <div className="provider-section">
            <h3>Tours populares en Madrid</h3>
            <div
              data-gyg-widget="activities"
              data-gyg-partner-id={providers.getyourguide.partnerId}
              data-gyg-locale-code="es-ES"
              data-gyg-currency="EUR"
              data-gyg-city-id="62"
              data-gyg-max-results="6"
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;