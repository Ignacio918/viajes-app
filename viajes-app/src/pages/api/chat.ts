import { genAI, travelAIConfig } from '../../config/ai-config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    const { data: { session } } = await supabase.auth.getSession();

    // Crear el modelo con la configuración
    const model = genAI.getGenerativeModel(travelAIConfig);

    // Crear el chat con la historia correctamente formateada
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Actúa como un experto asistente de viajes que ayuda a planificar itinerarios y dar recomendaciones de viaje." }]
        },
        {
          role: "model",
          parts: [{ text: "Entendido. Soy un asistente especializado en viajes, listo para ayudar con planificación de itinerarios, recomendaciones de destinos, consejos de viaje y más." }]
        }
      ],
    });

    // Obtener respuesta
    const result = await chat.sendMessage([{ text: message }]);
    const response = result.response.text();

    // Guardar en Supabase si el usuario está autenticado
    if (session?.user) {
      await supabase.from('conversations').insert({
        user_id: session.user.id,
        message: message,
        response: response,
        created_at: new Date(),
      });
    }

    return res.status(200).json({ response });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error processing your request' });
  }
}