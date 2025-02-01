import { useState, useEffect } from 'react';
import { Destination, Product, getDestinations, getDestinationProducts } from '../backend/apis/viator';

const userCategories = [
  { id: 'beach', label: '🏖️ Playas', keywords: ['BEACH', 'COAST', 'ISLAND'] },
  { id: 'culture', label: '🏛️ Cultura', keywords: ['HISTORIC', 'MUSEUM', 'CASTLE'] },
  { id: 'nature', label: '🏞️ Naturaleza', keywords: ['PARK', 'MOUNTAIN', 'FOREST'] },
  { id: 'adventure', label: '🏃 Aventura', keywords: ['ADVENTURE', 'SPORT', 'HIKING'] },
  { id: 'city', label: '🌆 Ciudades', keywords: ['CITY', 'TOWN'] },
  { id: 'food', label: '🍷 Gastronomía', keywords: ['FOOD', 'WINE', 'CULINARY'] }
];

interface DestinationWithProducts extends Destination {
  products?: Product[];
}

const TabsSection = () => {
  const [destinations, setDestinations] = useState<DestinationWithProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<DestinationWithProducts | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        console.log('Fetched destinations:', data);
        setDestinations(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Error al cargar los destinos');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleDestinationClick = async (destination: Destination) => {
    console.log('Selected destination:', destination);
    setLoadingProducts(true);
    setError(null);
    
    try {
      const products = await getDestinationProducts(destination.destinationId);
      console.log('Fetched products:', products);
      setSelectedDestination({ ...destination, products });
      
      if (products.length === 0) {
        setError('No se encontraron tours o actividades disponibles para este destino.');
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setError('No se pudieron cargar las actividades. Por favor, intenta de nuevo más tarde.');
    } finally {
      setLoadingProducts(false);
    }
  };

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategories = selectedCategories.length === 0 || selectedCategories.some(catId => {
      const category = userCategories.find(c => c.id === catId);
      return category?.keywords.some(keyword => 
        destination.type.includes(keyword) || destination.name.toUpperCase().includes(keyword)
      );
    });
    return matchesSearch && matchesCategories;
  });

  const redirectToViator = (productCode: string) => {
    const affiliateId = import.meta.env.VITE_VIATOR_AFFILIATE_ID || '';
    window.open(`https://www.viator.com/tours/product/${productCode}?pid=${affiliateId}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Qué tipo de experiencia buscas?</h2>
        
        {/* Categorías */}
        <div className="flex flex-wrap gap-3 mb-6">
          {userCategories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedCategories.includes(category.id)
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Buscador */}
        <div className="relative">
          <input
            type="text"
            placeholder="Busca tu próximo destino..."
            className="w-full p-4 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-4 top-4 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Grid de destinos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.slice(0, 12).map((destination) => (
          <div 
            key={destination.destinationId}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48">
              {destination.photoUrl ? (
                <img 
                  src={destination.photoUrl}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl">🌎</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-xl font-bold text-white">{destination.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <button
                onClick={() => handleDestinationClick(destination)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Ver tours y actividades
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de productos */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedDestination.name}</h2>
              <button
                onClick={() => setSelectedDestination(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              {loadingProducts ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : selectedDestination.products?.length ? (
                <div className="grid gap-4">
                  {selectedDestination.products.map((product) => (
                    <div key={product.productCode} className="border rounded-lg overflow-hidden flex">
                      <div className="w-1/3">
                        <img 
                          src={product.photoUrl} 
                          alt={product.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {'★'.repeat(Math.floor(product.rating))}
                            {'☆'.repeat(5 - Math.floor(product.rating))}
                          </div>
                          <span className="ml-2 text-gray-600">
                            ({product.reviewCount} reseñas)
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{product.duration}</p>
                        <p className="text-gray-600 mb-4">{product.location}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-xl font-bold">
                            {product.price.amount} {product.price.currency}
                          </div>
                          <button
                            onClick={() => redirectToViator(product.productCode)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            Reservar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  {error || 'No se encontraron actividades para este destino'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabsSection;