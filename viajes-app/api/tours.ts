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

  // Verificar autenticación
  if (!checkAuth(req)) {
    return res.status(401).json({
      error: 'Unauthorized',
      status: 401
    });
  }

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

function checkAuth(req: VercelRequest): boolean {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false;
  }

  try {
    const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
      .toString()
      .split(':');
    
    return username === process.env.VITE_GYG_USERNAME && 
           password === process.env.VITE_GYG_PASSWORD;
  } catch {
    return false;
  }
}

async function handleAvailability(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const GYG_API_URL = 'https://api.getyourguide.com/1/tours';
    
    const response = await fetch(GYG_API_URL, {
      headers: {
        'Authorization': `Basic ${Buffer.from(
          `${process.env.VITE_GYG_USERNAME}:${process.env.VITE_GYG_PASSWORD}`
        ).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('GetYourGuide API error:', await response.text());
      throw new Error(`GetYourGuide API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transformar la respuesta al formato esperado
    const availabilities = data.data?.map((tour: any) => ({
      startTime: tour.startTime || new Date().toISOString(),
      endTime: tour.endTime || new Date(Date.now() + 7200000).toISOString(), // +2 horas
      vacancy: tour.vacancy || 10,
      pricing: {
        retail: {
          amount: tour.price?.amount || 50,
          currency: tour.price?.currency || "EUR"
        }
      }
    })) || [];

    return res.status(200).json({
      data: { availabilities },
      status: 200
    });
  } catch (error) {
    console.error('Availability error:', error);
    return res.status(500).json({
      error: 'Error al cargar disponibilidad desde GetYourGuide',
      status: 500
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

    const GYG_API_URL = `https://api.getyourguide.com/1/tours/${tourId}/bookings`;
    
    const bookingResponse = await fetch(GYG_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          `${process.env.VITE_GYG_USERNAME}:${process.env.VITE_GYG_PASSWORD}`
        ).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date,
        participants
      })
    });

    if (!bookingResponse.ok) {
      console.error('Booking error response:', await bookingResponse.text());
      throw new Error(`Error en la reserva: ${bookingResponse.status}`);
    }

    const bookingData = await bookingResponse.json();

    const booking = {
      bookingReference: bookingData.reference || `BOOKING_${Date.now()}`,
      status: bookingData.status || 'CONFIRMED' as const
    };

    return res.status(200).json({
      data: booking,
      status: 200
    });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({
      error: 'Error al procesar la reserva',
      status: 500
    });
  }
}