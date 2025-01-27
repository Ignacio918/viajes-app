// src/pages/api/tours.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import cors from 'cors';

// Tipos
interface APIResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

interface Availability {
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

interface Booking {
  bookingReference: string;
  status: 'CONFIRMED' | 'CANCELLED' | 'PENDING';
}

// Handler principal
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Habilitar CORS
  await new Promise((resolve, reject) => {
    cors()(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  // Router basado en método
  switch(req.method) {
    case 'GET':
      if (req.query.type === 'availability') {
        return handleAvailability(req, res);
      }
      break;
    case 'POST':
      if (req.query.type === 'booking') {
        return handleBooking(req, res);
      }
      break;
    default:
      return res.status(405).json({
        error: 'Method not allowed',
        status: 405
      });
  }
}

async function handleAvailability(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // La URL base de GetYourGuide
    const GYG_API_URL = 'https://api.getyourguide.com/1/tours/availability';
    
    // Parámetros de búsqueda
    const params = new URLSearchParams({
      cnt: '10', // número de resultados
      currency: 'USD',
      date_from: new Date().toISOString().split('T')[0],
      date_to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +30 días
      lang: 'es', // idioma español
    });

    // Realizar la petición a GetYourGuide
    const response = await fetch(`${GYG_API_URL}?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          `${process.env.VITE_GYG_USERNAME}:${process.env.VITE_GYG_PASSWORD}`
        ).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-Version': '2023-09-01',
        'User-Agent': 'ZenTrip/1.0'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GetYourGuide API error:', errorText);
      throw new Error(`GetYourGuide API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transformar la respuesta al formato esperado
    const availabilities = data.data?.map((tour: any) => ({
      id: tour.tour_id || '',
      title: tour.title || '',
      startTime: tour.available_from || new Date().toISOString(),
      endTime: tour.available_to || new Date(Date.now() + 7200000).toISOString(),
      vacancy: tour.availability || 0,
      pricing: {
        retail: {
          amount: tour.price_from || 0,
          currency: tour.currency || "USD"
        }
      },
      image: tour.image_url || '',
      description: tour.description || ''
    })) || [];

    return res.status(200).json({
      data: { availabilities },
      status: 200
    });
  } catch (error) {
    console.error('Availability error:', error);
    return res.status(500).json({
      error: 'Error al cargar disponibilidad desde GetYourGuide',
      status: 500,
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function handleBooking(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { tourId, date, participants } = req.body;

    // Validar datos requeridos
    if (!tourId || !date || !participants) {
      return res.status(400).json({
        error: 'Faltan datos requeridos para la reserva',
        status: 400
      });
    }

    // URL para realizar la reserva
    const GYG_API_URL = `https://api.getyourguide.com/1/tours/${tourId}/bookings`;
    
    // Realizar la petición de reserva a GetYourGuide
    const bookingResponse = await fetch(GYG_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          `${process.env.VITE_GYG_USERNAME}:${process.env.VITE_GYG_PASSWORD}`
        ).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-Version': '2023-09-01',
        'User-Agent': 'ZenTrip/1.0'
      },
      body: JSON.stringify({
        date,
        participants: {
          adults: participants
        },
        currency: 'USD',
        lang: 'es'
      })
    });

    if (!bookingResponse.ok) {
      const errorText = await bookingResponse.text();
      console.error('Booking error response:', errorText);
      throw new Error(`Error en la reserva: ${bookingResponse.status}`);
    }

    const bookingData = await bookingResponse.json();

    const booking = {
      bookingReference: bookingData.reference || `BOOKING_${Date.now()}`,
      status: bookingData.status || 'CONFIRMED' as const,
      details: bookingData
    };

    return res.status(200).json({
      data: booking,
      status: 200
    });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({
      error: 'Error al procesar la reserva',
      status: 500,
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}