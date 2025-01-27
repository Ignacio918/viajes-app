// src/pages/api/tours.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import cors from 'cors';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
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
      if (!process.env.GYG_API_USERNAME || !process.env.GYG_API_PASSWORD) {
        throw new Error('Credenciales de API faltantes');
      }

      // Cambio importante: URL según la documentación oficial de Partner API
      const GYG_API_URL = 'https://partner.getyourguide.com/v1/activities';

      // Parámetros según la documentación de Partner API
      const params = new URLSearchParams({
        'limit': '10',
        'currency': 'USD',
        'language': 'es',
        'from': new Date().toISOString().split('T')[0],
        'to': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });

      console.log('Intentando conectar a GetYourGuide Partner API...');
      console.log('URL:', `${GYG_API_URL}?${params}`);
      console.log('Usando credenciales:', process.env.GYG_API_USERNAME);

      const response = await fetch(`${GYG_API_URL}?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from(
            `${process.env.GYG_API_USERNAME}:${process.env.GYG_API_PASSWORD}`
          ).toString('base64')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('Respuesta de GYG:', {
        status: response.status,
        statusText: response.statusText
      });

      const responseText = await response.text();
      console.log('Respuesta raw:', responseText.substring(0, 200));

      if (!response.ok) {
        throw new Error(`Error de API: ${response.status} - ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Datos parseados:', data);

        // Transformar los datos según el formato de Partner API
        const tours = data.items?.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: {
            amount: item.pricing?.retail?.value || 0,
            currency: item.pricing?.retail?.currency || 'USD'
          },
          startTime: item.availability?.firstAvailableDate || new Date().toISOString(),
          endTime: item.availability?.lastAvailableDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          vacancy: item.availability?.vacancies || 0,
          image: item.images?.[0]?.urls?.original || '',
          description: item.abstract || item.description || ''
        })) || [];

        console.log('Tours procesados:', tours);

        return res.status(200).json({
          data: { tours },
          status: 200
        });
      } catch (e) {
        console.error('Error parseando respuesta:', e);
        throw new Error('Error parseando respuesta de GetYourGuide');
      }

    } catch (error) {
      console.error('Error completo:', error);
      return res.status(500).json({
        error: 'Error al cargar tours desde GetYourGuide',
        status: 500,
        details: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  return res.status(405).json({
    error: 'Method not allowed',
    status: 405
  });
}