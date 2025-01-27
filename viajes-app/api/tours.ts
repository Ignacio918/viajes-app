// src/pages/api/tours.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import cors from 'cors';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Agregar logs iniciales
  console.log('Environment variables check:');
  console.log('GYG_API_USERNAME exists:', !!process.env.GYG_API_USERNAME);
  console.log('GYG_API_PASSWORD exists:', !!process.env.GYG_API_PASSWORD);
  
  // También verificar todas las variables de entorno disponibles (sin mostrar valores)
  console.log('Available environment variables:', Object.keys(process.env));

  // Habilitar CORS
  await new Promise((resolve, reject) => {
    cors()(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  if (req.method === 'GET' && req.query.type === 'availability') {
    try {
      // Verificar credenciales
      if (!process.env.GYG_API_USERNAME || !process.env.GYG_API_PASSWORD) {
        console.error('Missing credentials:', {
          username: !process.env.GYG_API_USERNAME ? 'missing' : 'present',
          password: !process.env.GYG_API_PASSWORD ? 'missing' : 'present'
        });
        throw new Error('Credenciales de API de GetYourGuide no configuradas');
      }

      // URL de la API
      const GYG_API_URL = 'https://api.getyourguide.com/1/tours';

      console.log('Iniciando petición a GetYourGuide');
      console.log('URL:', GYG_API_URL);

      // Crear las credenciales
      const credentials = Buffer.from(
        `${process.env.GYG_API_USERNAME}:${process.env.GYG_API_PASSWORD}`
      ).toString('base64');
      
      console.log('Credentials created (not showing actual value)');

      const response = await fetch(GYG_API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText.substring(0, 200));

      // Devolver datos de ejemplo por ahora
      const mockTours = [{
        id: "mock1",
        title: "Tour de Ejemplo",
        price: {
          amount: 99.99,
          currency: "USD"
        },
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 7200000).toISOString(),
        vacancy: 10,
        image: "https://via.placeholder.com/300",
        description: "Tour de ejemplo para testing"
      }];

      return res.status(200).json({
        data: { tours: mockTours },
        status: 200,
        debug: {
          hasUsername: !!process.env.GYG_API_USERNAME,
          hasPassword: !!process.env.GYG_API_PASSWORD,
          apiUrl: GYG_API_URL
        }
      });

    } catch (error) {
      console.error('Error completo:', error);
      return res.status(500).json({
        error: 'Error al cargar tours desde GetYourGuide',
        status: 500,
        details: error instanceof Error ? error.message : 'Unknown error',
        debug: {
          hasUsername: !!process.env.GYG_API_USERNAME,
          hasPassword: !!process.env.GYG_API_PASSWORD,
          envVars: Object.keys(process.env)
        }
      });
    }
  }

  return res.status(405).json({
    error: 'Method not allowed',
    status: 405
  });
}