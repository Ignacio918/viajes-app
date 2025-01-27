// src/pages/api/tours.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import cors from 'cors';

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

  if (req.method === 'GET' && req.query.type === 'availability') {
    try {
      // Verificar credenciales de GYG (no las de tu cuenta)
      if (!process.env.GYG_API_USERNAME || !process.env.GYG_API_PASSWORD) {
        throw new Error('Credenciales de API de GetYourGuide no configuradas');
      }

      // URL correcta según la documentación
      const GYG_API_URL = 'https://api.getyourguide.com/1/tours';

      console.log('Conectando a GetYourGuide...');

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

      console.log('Status:', response.status);
      const responseText = await response.text();
      console.log('Respuesta:', responseText.substring(0, 200)); // Primeros 200 caracteres para debugging

      if (!response.ok) {
        throw new Error(`GetYourGuide API responded with status: ${response.status} - ${responseText}`);
      }

      // Para testing, si no hay respuesta válida, devolver datos de ejemplo
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

      try {
        const data = JSON.parse(responseText);
        const tours = data.data || mockTours;
        return res.status(200).json({
          data: { tours },
          status: 200
        });
      } catch (e) {
        console.error('Error parseando JSON:', e);
        // Devolver datos de ejemplo si hay error
        return res.status(200).json({
          data: { tours: mockTours },
          status: 200
        });
      }

    } catch (error) {
      console.error('Error detallado:', error);
      return res.status(500).json({
        error: 'Error al cargar tours desde GetYourGuide',
        status: 500,
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return res.status(405).json({
    error: 'Method not allowed',
    status: 405
  });
}