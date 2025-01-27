import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetch } from 'undici'; // Importación de fetch desde undici

const GYG_API_BASE_URL = 'https://api.getyourguide.com'; // Endpoint base de la API

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
    // Configurar autenticación básica
    const username = process.env.GYG_API_USERNAME;
    const password = process.env.GYG_API_PASSWORD;

    if (!username || !password) {
      throw new Error('Las credenciales de la API no están configuradas.');
    }

    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    // Construir la URL y hacer la solicitud
    const response = await fetch(`${GYG_API_BASE_URL}/v2/tours?type=${type}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en la API de GetYourGuide: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    res.status(200).json(data); // Enviar los datos al cliente
  } catch (error: any) {
    console.error('Error al obtener los tours:', error.message);
    res.status(500).json({ error: error.message || 'Error interno del servidor.' });
  }
}
