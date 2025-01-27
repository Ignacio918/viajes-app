import React, { useState } from 'react';
import axios from 'axios';
import TripMap, { Location } from '../components/TripMap';

const Places: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [center, setCenter] = useState<[number, number]>([-34.6037, -58.3816]); // Coordenadas iniciales (por ejemplo, Buenos Aires)
  const [recommendedPlaces, setRecommendedPlaces] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = async (query: string) => {
    setError(null);
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

      if (response.data.length > 0) {
        const place = response.data[0];
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);
        setCenter([lat, lng]);

        // Generar lugares recomendados alrededor del punto central
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
      } else {
        setError('No se encontraron resultados para la búsqueda.');
        setRecommendedPlaces([]);
      }
    } catch (error: any) {
      console.error('Error al buscar lugares:', error);
      setError('Error al buscar lugares. Por favor, intente nuevamente.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Por favor, ingrese un término de búsqueda.'); // Validación del término de búsqueda
      return;
    }
    searchPlaces(query);
  };

  return (
    <div className="places-container">
      <h2 className="text-2xl font-bold mb-6">Buscar lugares</h2>
      <form onSubmit={handleSearch} className="search-form mb-6">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Ingresa un destino..."
          className="destination-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
      
      {error && (
        <div className="error-message bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 h-[500px]">
          {recommendedPlaces.length > 0 ? (
            <TripMap
              locations={recommendedPlaces}
              selectedDay={1}
              onLocationClick={(location) => {
                console.log('Ubicación seleccionada:', location);
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
              <p className="text-gray-500">Busca un destino para ver recomendaciones</p>
            </div>
          )}
        </div>

        <div className="locations-list">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Lugares recomendados</h3>
            {recommendedPlaces.length > 0 ? (
              recommendedPlaces.map((place) => (
                <div key={place.id} className="mb-4 p-3 border-b last:border-b-0">
                  <h4 className="font-medium text-gray-800">{place.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{place.description}</p>
                </div>
              ))
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