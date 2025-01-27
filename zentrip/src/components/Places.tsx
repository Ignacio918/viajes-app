import React, { useState } from 'react';
import axios from 'axios';
import TripMap, { Location } from './TripMap';

const Places: React.FC = () => {
  console.log('Places component rendering'); // Agregamos este log para debug
  const [query, setQuery] = useState('');
  const [recommendedPlaces, setRecommendedPlaces] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query); // Log para debug

    if (!query.trim()) {
      setError('Por favor ingresa un destino');
      return;
    }

    try {
      const response = await axios.get('/api/search', {
        params: {
          q: query,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
        baseURL: 'https://nominatim.openstreetmap.org',
        headers: {
          'Accept-Language': 'es',
        },
      });

      console.log('API response:', response.data); // Log para debug

      if (response.data.length > 0) {
        const place = response.data[0];
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);

        const recommended: Location[] = [
          {
            id: '1',
            name: 'Hotel Principal',
            coordinates: [lat + 0.01, lng + 0.01],
            day: 1,
            description: 'Hotel 5 estrellas con vista panorámica',
          },
          {
            id: '2',
            name: 'Restaurante Local',
            coordinates: [lat - 0.005, lng + 0.005],
            day: 1,
            description: 'Gastronomía local destacada',
          },
          {
            id: '3',
            name: 'Atracción Turística',
            coordinates: [lat + 0.008, lng - 0.008],
            day: 1,
            description: 'Punto turístico imperdible',
          },
        ];

        setRecommendedPlaces(recommended);
        setError(null);
      } else {
        setError('No se encontraron resultados');
        setRecommendedPlaces([]);
      }
    } catch (error) {
      console.error('Error searching places:', error);
      setError('Error al buscar lugares. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="places-container p-4">
      <h2 className="text-2xl font-bold mb-6">Buscar lugares</h2>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ingresa un destino..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {recommendedPlaces.length > 0 ? (
            <div className="h-[500px]">
              <TripMap
                locations={recommendedPlaces}
                selectedDay={1}
                onLocationClick={(location) => {
                  console.log('Location clicked:', location);
                }}
              />
            </div>
          ) : (
            <div className="h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">Busca un destino para ver recomendaciones</p>
            </div>
          )}
        </div>

        <div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Lugares recomendados</h3>
            {recommendedPlaces.length > 0 ? (
              <div className="space-y-4">
                {recommendedPlaces.map((place) => (
                  <div key={place.id} className="p-3 border-b last:border-b-0">
                    <h4 className="font-medium text-gray-800">{place.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{place.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay recomendaciones disponibles</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Places;