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
    if (!process.env.VITE_GYG_USERNAME || !process.env.VITE_GYG_PASSWORD) {
      throw new Error('Credenciales de GetYourGuide no configuradas');
    }

    // URL base para la API pública de GetYourGuide
    const GYG_API_URL = 'https://api.getyourguide.com/1/activities';
    
    // Obtener fecha actual y fecha en 30 días
    const today = new Date();
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const params = new URLSearchParams({
      limit: '10',
      currency: 'USD',
      lang: 'es',
      date_from: today.toISOString().split('T')[0],
      date_to: thirtyDaysFromNow.toISOString().split('T')[0],
      q: 'tours'  // Búsqueda general de tours
    });

    console.log('Fetching tours with params:', params.toString());

    const response = await fetch(`${GYG_API_URL}?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          `${process.env.VITE_GYG_USERNAME}:${process.env.VITE_GYG_PASSWORD}`
        ).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'ZenTrip/1.0'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GetYourGuide API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        url: GYG_API_URL,
        params: params.toString()
      });
      throw new Error(`GetYourGuide API responded with status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('GetYourGuide API response:', data);

    // Si no hay datos, devolver array vacío
    if (!data || !Array.isArray(data.data)) {
      return res.status(200).json({
        data: { tours: [] },
        status: 200
      });
    }

    // Transformar los datos
    const tours = data.data.map((tour: any) => ({
      id: tour.id || '',
      title: tour.title || 'Tour sin título',
      price: {
        amount: parseFloat(tour.price_from || '0'),
        currency: tour.price_currency || 'USD'
      },
      startTime: tour.available_from || today.toISOString(),
      endTime: tour.available_to || thirtyDaysFromNow.toISOString(),
      vacancy: parseInt(tour.availability || '10'),
      image: tour.photos?.[0]?.url || '',
      description: tour.abstract || tour.description || 'Sin descripción'
    }));

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

    const GYG_API_URL = `https://api.getyourguide.com/1/activities/${tourId}/bookings`;

    const bookingResponse = await fetch(GYG_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          `${process.env.VITE_GYG_USERNAME}:${process.env.VITE_GYG_PASSWORD}`
        ).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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