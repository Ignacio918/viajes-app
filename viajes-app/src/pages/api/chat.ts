import { createClient } from '@supabase/supabase-js';
import { genAI, travelAIConfig } from 'src/config/ai-config';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const sendChatMessage = async (message: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const model = genAI.getGenerativeModel(travelAIConfig);
    
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

    const result = await chat.sendMessage([{ text: message }]);
    const response = await result.response.text();

    if (session?.user) {
      await supabase.from('conversations').insert({
        user_id: session.user.id,
        message: message,
        response: response,
        created_at: new Date(),
      });
    }

    return { response };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};