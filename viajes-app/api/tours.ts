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
      console.log('Variables de entorno disponibles:', {
        hasUsername: !!process.env.GYG_API_USERNAME,
        hasPassword: !!process.env.GYG_API_PASSWORD
      });

      if (!process.env.GYG_API_USERNAME || !process.env.GYG_API_PASSWORD) {
        throw new Error('Credenciales de API faltantes');
      }

      const GYG_API_URL = 'https://api.getyourguide.com/1/tours';
      
      const params = new URLSearchParams({
        cnt: '10',
        currency: 'USD',
        date_from: new Date().toISOString().split('T')[0],
        date_to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        lang: 'es'
      });

      console.log('URL de la petición:', `${GYG_API_URL}?${params}`);

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

      console.log('Estado de la respuesta:', response.status);
      const responseText = await response.text();
      console.log('Respuesta:', responseText.substring(0, 200));

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Datos parseados:', data);

        const tours = Array.isArray(data) ? data : (data.data || []);
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