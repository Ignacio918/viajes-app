import React, { useState } from 'react';

interface Availability {
  startTime: string;
  endTime: string;
  vacancy: number;
  pricing: {
    retail: {
      amount: number;
      currency: string;
    }
  }
}

interface Booking {
  bookingReference: string;
  status: 'CONFIRMED' | 'CANCELLED' | 'PENDING';
}

const Tours: React.FC = () => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [bookingRef, setBookingRef] = useState('');
  const [error, setError] = useState('');

  const checkAvailability = async () => {
    try {
      const response = await fetch('/api/tours?type=availability', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(`${import.meta.env.VITE_GYG_USERNAME}:${import.meta.env.VITE_GYG_PASSWORD}`)
        }
      });
      const { data } = await response.json();
      setAvailabilities(data.availabilities);
      setError('');
    } catch (error) {
      console.error('Error checking availability:', error);
      setError('Error al cargar disponibilidad');
    }
  };

  const makeBooking = async () => {
    try {
      const response = await fetch('/api/tours?type=booking', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${import.meta.env.VITE_GYG_USERNAME}:${import.meta.env.VITE_GYG_PASSWORD}`),
          'Content-Type': 'application/json'
        }
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
        <div>
          <button
            onClick={checkAvailability}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Buscar Disponibilidad
          </button>

          {availabilities.length > 0 && (
            <div className="mt-4">
              <h3 className="font-bold text-lg mb-2">Horarios Disponibles:</h3>
              <div className="grid gap-4">
                {availabilities.map((avail, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow">
                    <p className="font-medium">
                      Inicio: {new Date(avail.startTime).toLocaleString()}
                    </p>
                    <p className="font-medium">
                      Fin: {new Date(avail.endTime).toLocaleString()}
                    </p>
                    <p>Lugares disponibles: {avail.vacancy}</p>
                    <p className="font-bold text-lg mt-2">
                      Precio: {avail.pricing.retail.amount} {avail.pricing.retail.currency}
                    </p>
                    <button
                      onClick={makeBooking}
                      className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Reservar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

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