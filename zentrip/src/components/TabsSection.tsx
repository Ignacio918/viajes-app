// src/components/TabsSection.tsx
import { useState, useEffect, useRef } from 'react';
import { useViator, ViatorTour, ViatorDestination } from '../backend/apis/viator';

const TabsSection = () => {
  const { searchTours, searchDestinations, loading, error: apiError } = useViator();
  const [searchResults, setSearchResults] = useState<ViatorTour[]>([]);
  const [destinations, setDestinations] = useState<ViatorDestination[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState({
    destination: '',
    destinationId: '',
    startDate: '',
    endDate: ''
  });

  // Referencia para el dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounce para la búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchParams.destination.length >= 3) {
        handleDestinationSearch(searchParams.destination);
      } else {
        setDestinations([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchParams.destination]);

  const handleDestinationSearch = async (query: string) => {
    const results = await searchDestinations(query);
    setDestinations(results);
    setShowSuggestions(true);
  };

  const handleDestinationSelect = (destination: ViatorDestination) => {
    setSearchParams(prev => ({
      ...prev,
      destination: destination.name,
      destinationId: destination.destinationId
    }));
    setShowSuggestions(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!searchParams.destinationId) {
      setLocalError('Por favor, selecciona un destino válido');
      return;
    }

    const results = await searchTours({
      destination: searchParams.destinationId,
      startDate: searchParams.startDate,
      endDate: searchParams.endDate
    });

    if (results?.data) {
      setSearchResults(results.data);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Input de destino con autocompletado */}
          <div className="relative" ref={dropdownRef}>
            <input
              type="text"
              placeholder="¿A dónde quieres ir?"
              value={searchParams.destination}
              onChange={(e) => setSearchParams(prev => ({
                ...prev,
                destination: e.target.value,
                destinationId: ''
              }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
            />
            {showSuggestions && destinations.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {destinations.map((dest) => (
                  <button
                    key={dest.destinationId}
                    type="button"
                    onClick={() => handleDestinationSelect(dest)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 border-b last:border-b-0"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {dest.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {dest.parentDestinationName}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Inputs de fecha */}
          <input
            type="date"
            value={searchParams.startDate}
            onChange={(e) => setSearchParams(prev => ({ ...prev, startDate: e.target.value }))}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
            min={new Date().toISOString().split('T')[0]}
          />
          <input
            type="date"
            value={searchParams.endDate}
            onChange={(e) => setSearchParams(prev => ({ ...prev, endDate: e.target.value }))}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
            min={searchParams.startDate || new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Botón de búsqueda */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:bg-pink-400"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {/* Mensajes de error */}
      {(localError || apiError) && (
        <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-lg">
          {localError || apiError}
        </div>
      )}

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((tour) => (
          <div key={tour.productCode} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {tour.images?.[0] && (
              <img 
                src={tour.images[0].url} 
                alt={tour.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{tour.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{tour.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold">
                    ${tour.price.amount}
                  </span>
                  {tour.duration && (
                    <span className="block text-sm text-gray-500">
                      {tour.duration}
                    </span>
                  )}
                </div>
                {tour.bookingUrl && (
                  <a
                    href={tour.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
                  >
                    Ver más
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TabsSection;