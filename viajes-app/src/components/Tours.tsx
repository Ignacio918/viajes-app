import { useState } from 'react';
import '../styles/Tours.css';

interface Tour {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  vacancy: number;
  pricing: {
    retail: {
      amount: number;
      currency: string;
    }
  };
  image: string;
  description: string;
}

const Tours = () => {
  const [availabilities, setAvailabilities] = useState<Tour[]>([]);
  const [bookingRef, setBookingRef] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const checkAvailability = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/tours?type=availability', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${import.meta.env.VITE_GYG_USERNAME}:${import.meta.env.VITE_GYG_PASSWORD}`)}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${errorText}`);
      }

      const { data } = await response.json();
      setAvailabilities(data.availabilities);
    } catch (error) {
      console.error('Error checking availability:', error);
      setError('Error al cargar disponibilidad. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const makeBooking = async (tourId: string) => {
    try {
      const response = await fetch('/api/tours?type=booking', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${import.meta.env.VITE_GYG_USERNAME}:${import.meta.env.VITE_GYG_PASSWORD}`)}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tourId,
          date: new Date().toISOString().split('T')[0],
          participants: 1
        })
      });

      const { data } = await response.json();
      setBookingRef(data.bookingReference);
      setError('');
    } catch (error) {
      console.error('Error making booking:', error);
      setError('Error al realizar la reserva');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tours Disponibles</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <button
          onClick={checkAvailability}
          disabled={loading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Cargando...' : 'Ver Disponibilidad'}
        </button>

        {availabilities.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availabilities.map((tour) => (
              <div key={tour.id} className="border rounded-lg overflow-hidden shadow-lg">
                {tour.image && (
                  <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{tour.description}</p>
                  <div className="space-y-2">
                    <p><strong>Inicio:</strong> {new Date(tour.startTime).toLocaleString()}</p>
                    <p><strong>Fin:</strong> {new Date(tour.endTime).toLocaleString()}</p>
                    <p><strong>Lugares disponibles:</strong> {tour.vacancy}</p>
                    <p className="text-lg font-bold">
                      {tour.pricing.retail.amount} {tour.pricing.retail.currency}
                    </p>
                  </div>
                  <button
                    onClick={() => makeBooking(tour.id)}
                    className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {bookingRef && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p className="font-bold">¡Reserva exitosa!</p>
            <p>Número de referencia: {bookingRef}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;