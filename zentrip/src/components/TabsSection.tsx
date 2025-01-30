// src/components/TabsSection.tsx
import { useState } from 'react';
import { useViator, ViatorTour } from '../backend/apis/viator';

const TabsSection = () => {
  const { searchTours, loading, error } = useViator();
  const [searchResults, setSearchResults] = useState<ViatorTour[]>([]);
  const [searchParams, setSearchParams] = useState({
    destination: '',
    startDate: '',
    endDate: ''
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchParams.destination) return;

    const results = await searchTours({
      destination: searchParams.destination,
      startDate: searchParams.startDate,
      endDate: searchParams.endDate
    });

    if (results?.data) {
      setSearchResults(results.data);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Buscador */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="¿A dónde quieres ir?"
            value={searchParams.destination}
            onChange={(e) => setSearchParams(prev => ({ ...prev, destination: e.target.value }))}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
          />
          <input
            type="date"
            value={searchParams.startDate}
            onChange={(e) => setSearchParams(prev => ({ ...prev, startDate: e.target.value }))}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
          />
          <input
            type="date"
            value={searchParams.endDate}
            onChange={(e) => setSearchParams(prev => ({ ...prev, endDate: e.target.value }))}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:bg-pink-400"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {/* Mensaje de error */}
      {error && (
        <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-lg">
          {error}
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