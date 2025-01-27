// src/pages/api/tours.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

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
  // Comentamos temporalmente la verificación de auth para pruebas
  /*if (!checkAuth(req)) {
    return res.status(401).json({
      error: 'Unauthorized',
      status: 401
    });
  }*/

  // Router basado en método
  try {
    switch(req.method) {
      case 'GET':
        if (req.query.type === 'availability') {
          return handleAvailability(req, res);
        }
        break;
      case 'POST':
        if (req.query.type === 'booking') {
          return handleBooking(req, res);
        } else if (req.url?.includes('notify-availability-update')) {
          return handleNotifyAvailability(req, res);
        }
        break;
      default:
        return res.status(405).json({
          error: 'Method not allowed',
          status: 405
        });
    }
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      status: 500,
      details: error instanceof Error ? error.message : 'Unknown error'
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
    
    return username === process.env.GYG_API_USERNAME && 
           password === process.env.GYG_API_PASSWORD;
  } catch {
    return false;
  }
}

async function handleAvailability(
  req: VercelRequest,
  res: VercelResponse
): Promise<void | VercelResponse> {
  try {
    console.log('Iniciando búsqueda de disponibilidad...');

    // Intentar obtener tours de GetYourGuide
    const gygTours = await fetchGYGTours();
    
    if (gygTours && gygTours.length > 0) {
      return res.status(200).json({
        data: { tours: gygTours },
        status: 200
      });
    }

    // Si no hay tours de GYG, usar datos de ejemplo
    const availabilities = [
      {
        startTime: "2024-02-01T10:00:00+01:00",
        endTime: "2024-02-01T12:00:00+01:00",
        vacancy: 10,
        pricing: {
          retail: {
            amount: 50,
            currency: "EUR"
          }
        }
      }
    ];

    // Convertir disponibilidades a formato de tours
    const tours: Tour[] = availabilities.map((avail, index) => ({
      id: `tour-${index + 1}`,
      title: `Tour de Ejemplo ${index + 1}`,
      price: {
        amount: avail.pricing.retail.amount,
        currency: avail.pricing.retail.currency
      },
      startTime: avail.startTime,
      endTime: avail.endTime,
      vacancy: avail.vacancy,
      image: "https://picsum.photos/300/200",
      description: "Tour de ejemplo para testing"
    }));

    return res.status(200).json({
      data: { tours },
      status: 200
    });
  } catch (error) {
    console.error('Availability error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      status: 500
    });
  }
}

async function handleBooking(
  req: VercelRequest,
  res: VercelResponse
): Promise<void | VercelResponse> {
  try {
    const booking = {
      bookingReference: `BOOKING_${Date.now()}`,
      status: 'CONFIRMED' as const
    };

    return res.status(200).json({
      data: booking,
      status: 200
    });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      status: 500
    });
  }
}

async function handleNotifyAvailability(
  req: VercelRequest,
  res: VercelResponse
): Promise<void | VercelResponse> {
  try {
    console.log('Recibida notificación de disponibilidad:', req.body);
    
    // Formato de respuesta esperado por GetYourGuide
    const response = {
      "data": {
        "availabilities": [
          {
            "productId": "12345",
            "startTime": "2024-02-01T10:00:00+00:00",
            "endTime": "2024-02-01T12:00:00+00:00",
            "pricing": {
              "retail": {
                "value": 29.99,
                "currency": "USD"
              }
            },
            "vacancies": 10,
            "minimumPeople": 1,
            "maximumPeople": 10
          }
        ]
      }
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Notify availability error:', error);
    return res.status(500).json({
      error: 'Error processing availability notification',
      status: 500
    });
  }
}

async function fetchGYGTours(): Promise<Tour[] | null> {
  try {
    if (!process.env.GYG_API_USERNAME || !process.env.GYG_API_PASSWORD) {
      console.error('Faltan credenciales de GYG');
      return null;
    }

    const GYG_API_URL = 'https://supplier-api.getyourguide.com/1/products';
    
    console.log('Conectando con GetYourGuide API...');
    
    const response = await fetch(GYG_API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          `${process.env.GYG_API_USERNAME}:${process.env.GYG_API_PASSWORD}`
        ).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('Error en respuesta de GYG:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('Datos recibidos de GYG:', data);

    // Transformar datos de GYG al formato de Tour
    return data.items?.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: {
        amount: item.pricing?.retail?.value || 0,
        currency: item.pricing?.retail?.currency || 'USD'
      },
      startTime: item.availabilityStart || new Date().toISOString(),
      endTime: item.availabilityEnd || new Date(Date.now() + 86400000).toISOString(),
      vacancy: item.vacancies || 0,
      image: item.images?.[0]?.url || 'https://via.placeholder.com/300',
      description: item.description || ''
    })) || null;

  } catch (error) {
    console.error('Error fetching GYG tours:', error);
    return null;
  }
}