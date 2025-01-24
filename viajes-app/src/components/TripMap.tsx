// src/components/TripMap.tsx
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/TripMap.css';

export interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  day: number;
  time?: string;
  description?: string;
}

interface TripMapProps {
  locations: Location[];
  selectedDay?: number;
  onLocationClick?: (location: Location) => void;
}

const TripMap = ({ locations, selectedDay, onLocationClick }: TripMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup>();

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('trip-map').setView([0, 0], 2);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      markersRef.current = L.layerGroup().addTo(mapRef.current);
    }

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    markersRef.current.clearLayers();
    const bounds = L.latLngBounds([]);

    // Filtrar ubicaciones por día si hay uno seleccionado
    const filteredLocations = selectedDay 
      ? locations.filter(loc => loc.day === selectedDay)
      : locations;

    filteredLocations.forEach((location, index) => {
      // Crear marcador
      const marker = L.marker(location.coordinates, {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<div class="marker-content">${index + 1}</div>`,
          iconSize: [30, 30]
        })
      });

      // Agregar popup
      marker.bindPopup(`
        <div class="marker-popup">
          <h3>${location.name}</h3>
          <p>Día ${location.day}</p>
          ${location.time ? `<p>Hora: ${location.time}</p>` : ''}
          ${location.description ? `<p>${location.description}</p>` : ''}
        </div>
      `);

      marker.on('click', () => onLocationClick?.(location));
      marker.addTo(markersRef.current!);
      bounds.extend(location.coordinates);
    });

    // Dibujar ruta
    if (filteredLocations.length > 1) {
      const route = L.polyline(
        filteredLocations.map(loc => loc.coordinates),
        { 
          color: '#E61C5D',
          weight: 3,
          opacity: 0.8
        }
      ).addTo(markersRef.current);
    }

    // Ajustar vista
    if (bounds.isValid()) {
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, selectedDay]);

  return (
    <div className="trip-map-container">
      <div id="trip-map" className="trip-map" />
    </div>
  );
};

export default TripMap;