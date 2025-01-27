// src/pages/api/tours.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import cors from 'cors';

// Tipos
interface APIResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

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
        return handleTours(req, res);
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

async function handleTours(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // URL base para la API pública de GetYourGuide
    const GYG_API_URL = 'https://api.getyourguide.com/1/tours';
    
    const params = new URLSearchParams({
      cnt: '10',
      currency: 'USD',
      language: 'es'
    });

    console.log('Fetching tours...');

    const response = await fetch(`${GYG_API_URL}?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          `${process.env.VITE_GYG_USERNAME}:${process.env.VITE_GYG_PASSWORD}`
        ).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GetYourGuide API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`GetYourGuide API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('GetYourGuide API response received');

    // Transformar los datos
    const tours = Array.isArray(data) ? data.map((tour: any) => ({
      id: tour.id || '',
      title: tour.title || '',
      price: {
        amount: tour.price || 0,
        currency: tour.currency || 'USD'
      },
      startTime: tour.startTime || new Date().toISOString(),
      endTime: tour.endTime || new Date(Date.now() + 7200000).toISOString(),
      vacancy: tour.vacancy || 10,
      image: tour.primaryImage || tour.image || '',
      description: tour.description || ''
    })) : [];

    return res.status(200).json({
      data: { tours },
      status: 200
    });
  } catch (error) {
    console.error('Tours fetch error:', error);
    return res.status(500).json({
      error: 'Error al cargar tours desde GetYourGuide',
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

    if (!tourId || !date || !participants) {
      return res.status(400).json({
        error: 'Faltan datos requeridos para la reserva',
        status: 400
      });
    }

    const GYG_API_URL = `https://api.getyourguide.com/1/tours/${tourId}/book`;

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
        participants: {
          adults: participants
        }
      })
    });

    if (!bookingResponse.ok) {
      const errorText = await bookingResponse.text();
      console.error('Booking error response:', errorText);
      throw new Error(`Error en la reserva: ${bookingResponse.status}`);
    }

    const responseData = await bookingResponse.json();

    return res.status(200).json({
      data: responseData,
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