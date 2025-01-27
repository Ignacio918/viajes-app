import React, { useState } from 'react';
import axios from 'axios';

const Places: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchPlaces = async (query: string) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: query,
          format: 'json',
          addressdetails: 1,
          extratags: 1,
          limit: 10
        }
      });
      setResults(response.data);
    } catch (error: any) {
      console.error('Error al buscar lugares:', error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPlaces(query);
  };

  return (
    <div className="places-container">
      <h2>Places</h2>
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
      <ul className="places-list">
        {results.map((place: any) => (
          <li key={place.place_id}>
            <strong>{place.display_name}</strong>
            <br />
            Lat: {place.lat}, Lon: {place.lon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Places;