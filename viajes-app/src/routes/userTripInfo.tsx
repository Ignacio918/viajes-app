import { createServer, IncomingMessage, ServerResponse } from 'http';
import { supabase } from '../supabaseClient'; // Asegúrate de tener tu cliente Supabase configurado aquí.
import { parse } from 'url';

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parse(req.url || '', true);
  const { pathname, query } = parsedUrl;

  if (pathname === '/api/user-trip-info' && req.method === 'GET') {
    try {
      const userId = query.userId as string;
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

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        name: data.name,
        daysRemaining: daysRemaining,
      }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: (error as Error).message }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

export default server;