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

// Handler principal
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
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

    return res.status(200).json({
      data: { availabilities },
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
) {
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