import React, { useState } from 'react';
import axios from 'axios';
import TripMap, { Location } from '../components/TripMap';

const Places: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [center, setCenter] = useState<[number, number]>([0, 0]); // Centro del mapa
  const [recommendedPlaces, setRecommendedPlaces] = useState<Location[]>([]); // Lugares recomendados
  const [error, setError] = useState<string | null>(null); // Estado de error

  const searchPlaces = async (query: string) => {
    console.log('Buscando lugares para:', query); // Debug
    setError(null); // Reset error state
    try {
      // Buscar la ubicación principal
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: query,
          format: 'json',
          addressdetails: 1,
          extratags: 1,
          limit: 1, // Solo necesitamos el primer resultado para el centro del mapa
        },
      });
      
      console.log('Respuesta de la API:', response.data); // Verifica la respuesta

      if (response.data.length > 0) {
        const place = response.data[0];
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);
        setCenter([lat, lng]); // Establecer el centro del mapa

        // Simular lugares recomendados (puedes reemplazar esto con una API real)
        const recommended: Location[] = [
          {
            id: '1',
            name: 'Lugar recomendado 1',
            coordinates: [lat + 0.01, lng + 0.01],
            day: 1,
            description: 'Descripción del lugar 1',
          },
          {
            id: '2',
            name: 'Lugar recomendado 2',
            coordinates: [lat - 0.01, lng - 0.01],
            day: 1,
            description: 'Descripción del lugar 2',
          },
        ];
        console.log('Lugares recomendados:', recommended); // Verifica los lugares recomendados
        setRecommendedPlaces(recommended);
      } else {
        console.log('No se encontraron resultados para la búsqueda.');
        setRecommendedPlaces([]); // Limpiar lugares recomendados si no hay resultados
        setError('No se encontraron resultados para la búsqueda.'); // Establecer el mensaje de error
      }
    } catch (error: any) {
      console.error('Error al buscar lugares:', error.message);
      setError('Error al buscar lugares.'); // Establecer el mensaje de error
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
      <h2>Buscar lugares</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar lugares..."
          className="destination-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      
      {/* Mostrar el mapa con TripMap */}
      <div style={{ height: '400px', marginTop: '20px' }}>
        {recommendedPlaces.length > 0 ? (
          <TripMap
            locations={recommendedPlaces}
            selectedDay={1}
            onLocationClick={(location) => {
              console.log('Ubicación seleccionada:', location);
            }}
          />
        ) : (
          <p>No se encontraron lugares recomendados.</p>
        )}
      </div>
      
      {/* Lista de lugares recomendados */}
      <ul className="places-list">
        {recommendedPlaces.map((place) => (
          <li key={place.id}>
            <strong>{place.name}</strong>
            <br />
            Lat: {place.coordinates[0]}, Lon: {place.coordinates[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Places;