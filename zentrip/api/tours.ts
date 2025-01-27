import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetch } from 'undici';

const GYG_API_BASE_URL = 'https://api.getyourguide.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type } = req.query;

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método no permitido. Usa GET.' });
    return;
  }

  if (!type) {
    res.status(400).json({ error: 'El parámetro "type" es obligatorio.' });
    return;
  }

  try {
    const username = process.env.GYG_API_USERNAME;
    const password = process.env.GYG_API_PASSWORD;

    if (!username || !password) {
      throw new Error('Las credenciales de la API no están configuradas.');
    }

    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    console.log('URL solicitada:', `${GYG_API_BASE_URL}/v2/tours?type=${type}`);
    console.log('Autenticación:', auth);

    const response = await fetch(`${GYG_API_BASE_URL}/v2/tours?type=${type}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Estado de la respuesta:', response.status);

    const responseText = await response.text(); // Leer respuesta como texto para debug
    console.log('Respuesta de la API:', responseText);

    if (!response.ok) {
      throw new Error(`Error en la API de GetYourGuide: ${response.status} - ${responseText}`);
    }

    const data = JSON.parse(responseText); // Intentar convertir la respuesta a JSON
    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error en el handler:', error.message);
    res.status(500).json({ error: error.message || 'Error interno del servidor.' });
  }
}
