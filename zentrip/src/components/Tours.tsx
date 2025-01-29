// src/components/Tours.tsx
import React, { useState, useEffect } from 'react';
import '../styles/Tours.css';

interface Tour {
  id: string;
  title: string;
  price: {
    amount: number;
    currency: string;
  };
  startTime: string;
  endTime: string;
  vacancy: number;
  image: string;
  description: string;
}

interface Deal {
  id: string;
  title: string;
}

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAvailability = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/tours?type=availability');
      const data = await response.json();

      // Verificar la estructura de la respuesta
      if (data.error) {
        throw new Error(data.error);
      }

      // Asegurarse de que data.data.tours existe y es un array
      const toursList = data.data?.tours || [];
      console.log('Tours recibidos:', toursList);
      
      setTours(toursList);
    } catch (err) {
      console.error('Error fetching tours:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar los tours');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeals = async () => {
    try {
      const response = await fetch('https://zentrip.vercel.app/api/gyg/deals', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic zentrip:4392d51687c605b11df5c2a9f0acb5ec',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setDeals(data);
    } catch (err) {
      console.error('Error fetching deals:', err);
      setError('Error al cargar los deals');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchDeals();
        await checkAvailability();
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Tours Disponibles</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <button
        onClick={checkAvailability}
        disabled={loading}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Cargando...' : 'Ver Disponibilidad'}
      </button>

      {loading && (
        <div className="mt-4">
          <p>Cargando tours...</p>
        </div>
      )}

      {!loading && tours.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div key={tour.id} className="border rounded-lg overflow-hidden shadow-lg">
              {tour.image && (
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    // Imagen de respaldo si la original falla
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300';
                  }}
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{tour.description}</p>
                <div className="space-y-2">
                  <p><strong>Inicio:</strong> {new Date(tour.startTime).toLocaleString()}</p>
                  <p><strong>Fin:</strong> {new Date(tour.endTime).toLocaleString()}</p>
                  <p><strong>Lugares disponibles:</strong> {tour.vacancy}</p>
                  <p className="text-lg font-bold">
                    {tour.price.amount} {tour.price.currency}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && tours.length === 0 && (
        <div className="mt-4">
          <p>No hay tours disponibles en este momento.</p>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Deals Disponibles</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div key={deal.id} className="border rounded-lg overflow-hidden shadow-lg">
            <h3 className="font-bold text-lg mb-2">{deal.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tours;