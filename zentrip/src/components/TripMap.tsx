import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/TripMap.css';

export interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  day: number;
  description: string;
  time?: string;
}

interface TripMapProps {
  locations: Location[];
  selectedDay?: number;
  onLocationClick: (location: Location) => void;
}

const TripMap: React.FC<TripMapProps> = ({ locations, selectedDay, onLocationClick }) => {
  useEffect(() => {
    // Inicializar el mapa
    const map = L.map('map').setView([-34.6037, -58.3816], 13);

    // Agregar el tile layer de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Agregar marcadores para cada ubicación
    locations.forEach(location => {
      const marker = L.marker(location.coordinates)
        .addTo(map)
        .bindPopup(location.name);

      marker.on('click', () => onLocationClick(location));
    });

    // Limpiar el mapa cuando el componente se desmonte
    return () => {
      map.remove();
    };
  }, [locations, selectedDay, onLocationClick]);

  return <div id="map" className="h-full w-full" />;
};

export default TripMap;