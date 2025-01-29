import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import Tours from './Tours';
import Flights from './Flights';
import 'leaflet/dist/leaflet.css';

interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  day: number;
  description: string;
  time?: string;
}

interface PlaceOfInterest {
  id: string;
  name: string;
  type: 'hotel' | 'attraction';
  coordinates: [number, number];
  description: string;
  distance?: string;
  website?: string;
  stars?: string;
  phone?: string;
  address?: string;
  openingHours?: string;
  booking_url?: string;
  price_range?: string;
  amenities?: string;
  entranceFee?: string;
  visitDuration?: string;
  rating?: string;
}

const TabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const [selectedPlace, setSelectedPlace] = useState<Location | null>(null);
  const [pointsOfInterest, setPointsOfInterest] = useState<PlaceOfInterest[]>([]);
  const [isLoadingPOI, setIsLoadingPOI] = useState(false);
  const [selectedPOI, setSelectedPOI] = useState<string | null>(null);

  console.log('TabsSection rendering, activeTab:', activeTab); // Debug log

  // Inicializar mapa solo cuando se selecciona la tab 'places'
  useEffect(() => {
    if (activeTab === 'places' && !mapRef.current) {
      console.log('Inicializando mapa'); // Debug log
      try {
        mapRef.current = L.map('map').setView([-34.6037, -58.3816], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current);
      } catch (error) {
        console.error('Error inicializando mapa:', error);
      }
    }

    return () => {
      if (mapRef.current && activeTab !== 'places') {
        console.log('Limpiando mapa'); // Debug log
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activeTab]);

  // Actualizar marcadores cuando cambian las ubicaciones
  useEffect(() => {
    if (!mapRef.current) return;

    // Limpiar marcadores existentes
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => loc.coordinates));
      
      locations.forEach(location => {
        L.marker(location.coordinates)
          .addTo(mapRef.current!)
          .bindPopup(location.name);
      });

      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations]);

  // Búsqueda de lugares con autocompletado
  const searchPlaces = async (query: string) => {
    if (query.length < 3) return;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error buscando lugares:', error);
    }
  };

  // Manejar cambios en el input de búsqueda
  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (value.length >= 3) {
      searchTimeout.current = setTimeout(() => {
        searchPlaces(value);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const searchNearbyPlaces = async (location: Location) => {
    setIsLoadingPOI(true);
    try {
      // Buscar hoteles con Booking.com/Expedia info
      const hotelsQuery = `
        [out:json][timeout:25];
        (
          node["tourism"="hotel"]["name"](around:5000,${location.coordinates[0]},${location.coordinates[1]});
          way["tourism"="hotel"]["name"](around:5000,${location.coordinates[0]},${location.coordinates[1]});
        );
        out body;
        >;
        out skel qt;
      `;

      // Buscar lugares turísticos importantes
      const attractionsQuery = `
        [out:json][timeout:25];
        (
          // Monumentos y sitios históricos
          node["historic"="monument"](around:5000,${location.coordinates[0]},${location.coordinates[1]});
          way["historic"="monument"](around:5000,${location.coordinates[0]},${location.coordinates[1]});
          
          // Museos
          node["tourism"="museum"](around:5000,${location.coordinates[0]},${location.coordinates[1]});
          
          // Sitios religiosos importantes
          node["building"="church"]["denomination"="catholic"](around:5000,${location.coordinates[0]},${location.coordinates[1]});
          node["amenity"="place_of_worship"]["religion"="christian"](around:5000,${location.coordinates[0]},${location.coordinates[1]});
          
          // Castillos y palacios
          node["historic"="castle"](around:5000,${location.coordinates[0]},${location.coordinates[1]});
          node["historic"="palace"](around:5000,${location.coordinates[0]},${location.coordinates[1]});
          
          // Sitios arqueológicos
          node["historic"="archaeological_site"](around:5000,${location.coordinates[0]},${location.coordinates[1]});
          
          // Plazas importantes
          node["place"="square"]["tourism"](around:5000,${location.coordinates[0]},${location.coordinates[1]});
        );
        out body;
        >;
        out skel qt;
      `;

      const [hotelsData, attractionsData] = await Promise.all([
        fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: hotelsQuery
        }).then(res => res.json()),
        fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: attractionsQuery
        }).then(res => res.json())
      ]);

      const hotels = hotelsData.elements.slice(0, 10).map((h: any) => ({
        id: h.id.toString(),
        name: h.tags.name || 'Hotel sin nombre',
        type: 'hotel' as const,
        coordinates: [h.lat, h.lon] as [number, number],
        description: h.tags.description || 'Hotel cercano',
        distance: '~' + calculateDistance(location.coordinates, [h.lat, h.lon]) + ' km',
        website: h.tags.website || h.tags['contact:website'],
        stars: h.tags.stars,
        phone: h.tags.phone || h.tags['contact:phone'],
        address: h.tags['addr:street'] ? 
          `${h.tags['addr:street']} ${h.tags['addr:housenumber'] || ''}` : 
          undefined,
        booking_url: h.tags['contact:booking'] || 
          `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(h.tags.name)}`,
        price_range: h.tags.price_range || 'Consultar precios',
        amenities: h.tags.amenities || 'WiFi, Aire acondicionado'
      }));

      const attractions = attractionsData.elements.slice(0, 15).map((a: any) => {
        const citySlug = location.name.split(',')[0].toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-');

        return {
          id: a.id.toString(),
          name: a.tags.name || a.tags.historic || a.tags.tourism,
          type: 'attraction' as const,
          coordinates: [a.lat, a.lon] as [number, number],
          description: a.tags.description || 
            a.tags.historic || 
            a.tags.tourism || 
            'Lugar de interés turístico',
          distance: '~' + calculateDistance(location.coordinates, [a.lat, a.lon]) + ' km',
          booking_url: `https://www.getyourguide.com/${citySlug}-l${getCityId(citySlug)}/s/?q=${encodeURIComponent(a.tags.name || '')}&partner_id=FRGBT5F`
        };
      });

      setPointsOfInterest([...hotels, ...attractions]);
      updateMapMarkers(location, [...hotels, ...attractions]);

    } catch (error) {
      console.error('Error buscando lugares cercanos:', error);
    } finally {
      setIsLoadingPOI(false);
    }
  };

  const updateMapMarkers = (location: Location, pois: PlaceOfInterest[]) => {
    if (!mapRef.current) return;

    // Limpiar marcadores existentes
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    const allLocations = [location, ...pois];
    const bounds = L.latLngBounds(allLocations.map(loc => loc.coordinates));
    
    allLocations.forEach(loc => {
      const isSelected = loc.id === selectedPOI;
      const isPlaceOfInterest = (loc: Location | PlaceOfInterest): loc is PlaceOfInterest => 
        'type' in loc;

      const icon = L.divIcon({
        className: `marker-icon ${isPlaceOfInterest(loc) ? loc.type : 'selected-place'}`,
        html: `<div class="w-6 h-6 rounded-full ${
          isSelected ? 'ring-2 ring-yellow-400 ring-offset-2' :
          isPlaceOfInterest(loc) ? (
            loc.type === 'hotel' ? 'bg-blue-500' :
            loc.type === 'attraction' ? 'bg-green-500' :
            'bg-red-500'
          ) : 'bg-red-500'
        }"></div>`
      });

      const popupContent = `
        <div class="p-2">
          <strong class="text-lg">${loc.name || ''}</strong>
          <p class="text-sm text-gray-600">${loc.description || ''}</p>
          ${isPlaceOfInterest(loc) ? `
            ${loc.type === 'hotel' ? `
              ${loc.stars ? `<p class="text-sm">⭐ ${loc.stars}</p>` : ''}
              ${loc.price_range ? `<p class="text-sm">💰 ${loc.price_range}</p>` : ''}
              ${loc.booking_url ? `<a href="${encodeURI(loc.booking_url)}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">Reservar hotel</a>` : ''}
            ` : ''}
            ${loc.type === 'attraction' ? `
              ${loc.rating ? `<p class="text-sm">⭐ ${loc.rating}</p>` : ''}
              ${loc.openingHours ? `<p class="text-sm">🕒 ${loc.openingHours}</p>` : ''}
              ${loc.entranceFee ? `<p class="text-sm">💰 ${loc.entranceFee}</p>` : ''}
              ${loc.booking_url ? `<a href="${encodeURI(loc.booking_url)}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">Ver entradas y tours</a>` : ''}
            ` : ''}
          ` : ''}
        </div>
      `.trim();

      L.marker(loc.coordinates, { icon })
        .addTo(mapRef.current!)
        .bindPopup(popupContent);
    });

    mapRef.current.fitBounds(bounds, { padding: [50, 50] });
  };

  const calculateDistance = (coord1: [number, number], coord2: [number, number]) => {
    const R = 6371; // Radio de la Tierra en km
    const lat1 = coord1[0] * Math.PI / 180;
    const lat2 = coord2[0] * Math.PI / 180;
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  // Función auxiliar para obtener IDs de ciudades comunes
  const getCityId = (city: string): string => {
    const cityIds: Record<string, string> = {
      'london': '57',
      'paris': '44',
      'rome': '33',
      'barcelona': '45',
      'madrid': '543',
      // Agregar más ciudades según necesites
    };
    return cityIds[city] || '';
  };

  // Modificar handlePlaceSelect para incluir la búsqueda de lugares cercanos
  const handlePlaceSelect = async (place: any) => {
    setSearchQuery(place.display_name);
    setShowSuggestions(false);
    
    const selectedLocation: Location = {
      id: '1',
      name: place.display_name,
      coordinates: [parseFloat(place.lat), parseFloat(place.lon)] as [number, number],
      day: 1,
      description: `Ubicación seleccionada`,
      time: new Date().toLocaleTimeString()
    };

    setSelectedPlace(selectedLocation);
    setLocations([selectedLocation]);
    await searchNearbyPlaces(selectedLocation);
  };

  const handlePOIClick = (poi: PlaceOfInterest) => {
    setSelectedPOI(poi.id);
    if (mapRef.current) {
      mapRef.current.setView(poi.coordinates, 15);
      // Actualizar marcadores para resaltar el seleccionado
      updateMapMarkers(selectedPlace!, pointsOfInterest);
    }
  };

  const renderPOI = (poi: PlaceOfInterest) => (
    <div 
      key={poi.id} 
      className={`p-4 border rounded-lg hover:bg-gray-50 space-y-2 cursor-pointer transition-colors
        ${selectedPOI === poi.id ? 'border-yellow-400 bg-yellow-50' : ''}`}
      onClick={() => handlePOIClick(poi)}
    >
      <p className="font-medium text-lg">{poi.name}</p>
      <p className="text-sm text-gray-600">{poi.description}</p>
      <p className="text-sm text-gray-600">{poi.distance}</p>
      {poi.type === 'hotel' && (
        <>
          {poi.stars && <p className="text-sm">⭐ {poi.stars} estrellas</p>}
          {poi.price_range && <p className="text-sm">💰 {poi.price_range}</p>}
          {poi.amenities && <p className="text-sm">🏨 {poi.amenities}</p>}
          {poi.booking_url && (
            <a 
              href={poi.booking_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm block"
            >
              Reservar ahora
            </a>
          )}
        </>
      )}
      {poi.type === 'attraction' && (
        <>
          {poi.rating && <p className="text-sm">⭐ {poi.rating}</p>}
          {poi.openingHours && <p className="text-sm">🕒 {poi.openingHours}</p>}
          {poi.visitDuration && <p className="text-sm">⏱️ Duración sugerida: {poi.visitDuration}</p>}
          {poi.booking_url && (
            <a 
              href={poi.booking_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm block"
            >
              Ver entradas y tours
            </a>
          )}
        </>
      )}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="tabs-container relative">
        <div className="flex space-x-1 border-b border-gray-200">
          {['search', 'tours', 'flights', 'places'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-2 text-sm font-medium transition-colors
                ${activeTab === tab 
                  ? 'text-pink-600 border-b-2 border-pink-600' 
                  : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'search' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="¿A dónde vas?"
                className="p-3 border rounded-lg"
              />
              <input 
                type="date" 
                className="p-3 border rounded-lg"
              />
              <button className="p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                Buscar
              </button>
            </div>
          )}

          {activeTab === 'places' && (
            <div className="places-content">
              <div className="relative mb-6" style={{ zIndex: 9999 }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  className="w-full p-3 border rounded-lg relative"
                  placeholder="¿A dónde quieres ir?"
                />
                
                {showSuggestions && suggestions.length > 0 && (
                  <div 
                    className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg" 
                    style={{ zIndex: 9999 }}
                  >
                    {suggestions.map((place) => (
                      <button
                        key={place.place_id}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                        onClick={() => handlePlaceSelect(place)}
                      >
                        {place.display_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200 relative" style={{ zIndex: 1 }}>
                    <div id="map" className="h-full w-full" />
                  </div>
                </div>

                <div className="md:col-span-1">
                  {isLoadingPOI ? (
                    <div className="p-4 text-center">
                      <p>Buscando lugares cercanos...</p>
                    </div>
                  ) : selectedPlace && pointsOfInterest.length > 0 ? (
                    <div className="space-y-4 overflow-y-auto max-h-[400px]">
                      <h3 className="font-bold text-lg">Lugares cercanos a {selectedPlace.name}</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-lg mb-2">Hoteles</h4>
                          {pointsOfInterest
                            .filter(poi => poi.type === 'hotel')
                            .map(renderPOI)}
                        </div>

                        <div>
                          <h4 className="font-medium text-lg mb-2">Atracciones</h4>
                          {pointsOfInterest
                            .filter(poi => poi.type === 'attraction')
                            .map(renderPOI)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p>Selecciona un lugar para ver recomendaciones</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tours' && <Tours />}
          {activeTab === 'flights' && <Flights />}
        </div>
      </div>
    </section>
  );
};

export default TabsSection;
