import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../supabaseClient'; // Asegúrate de tener tu cliente Supabase configurado aquí.

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const userId = req.query.userId as string; // Obtén el userId de los parámetros de la consulta
      const { data, error } = await supabase
        .from('users')
        .select('name, trip_date')
        .eq('id', userId)
        .single();

      if (error) throw error;

      const today = new Date();
      const tripDate = new Date(data.trip_date);
      const timeDiff = tripDate.getTime() - today.getTime();
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

      res.status(200).json({
        name: data.name,
        daysRemaining: daysRemaining,
      });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}