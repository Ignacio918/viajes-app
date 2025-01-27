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
      if (!process.env.VITE_GYG_USERNAME || !process.env.VITE_GYG_PASSWORD) {
        throw new Error('Credenciales de GetYourGuide no configuradas');
      }

      // URL base correcta según la documentación oficial
      const GYG_API_URL = 'https://partner.getyourguide.com/activities';

      console.log('Intentando conexión con GetYourGuide Partner API...');

      // Obtener fecha actual y fecha en 30 días
      const today = new Date();
      const thirtyDaysFromNow = new Date(today);
      thirtyDaysFromNow.setDate(today.getDate() + 30);

      const params = new URLSearchParams({
        'from': today.toISOString().split('T')[0],
        'to': thirtyDaysFromNow.toISOString().split('T')[0],
        'limit': '10',
        'currency': 'USD',
        'language': 'es'
      });

      const response = await fetch(`${GYG_API_URL}?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from(
            `${process.env.VITE_GYG_USERNAME}:${process.env.VITE_GYG_PASSWORD}`
          ).toString('base64')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': 'es',
          'User-Agent': 'ZenTrip/1.0'
        }
      });

      console.log('Status de la respuesta:', response.status);
      const responseText = await response.text();
      console.log('Respuesta completa:', responseText);

      if (!response.ok) {
        throw new Error(`GetYourGuide API responded with status: ${response.status} - ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
        
        // Transformar los datos según el formato de la API Partner
        const tours = data.items?.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: {
            amount: item.pricing?.retail?.value || 0,
            currency: item.pricing?.retail?.currency || 'USD'
          },
          startTime: item.availability?.firstAvailableDate || today.toISOString(),
          endTime: item.availability?.lastAvailableDate || thirtyDaysFromNow.toISOString(),
          vacancy: item.availability?.vacancies || 0,
          image: item.images?.[0]?.urls?.original || '',
          description: item.abstract || item.description || ''
        })) || [];

        return res.status(200).json({
          data: { tours },
          status: 200
        });

      } catch (e) {
        console.error('Error parseando respuesta JSON:', e);
        throw new Error('Error parsing API response');
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