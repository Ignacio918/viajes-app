import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI;

try {
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!API_KEY) {
    console.warn('API key no encontrada, usando fallback');
    genAI = new GoogleGenerativeAI('temp-key');
  } else {
    console.log('Inicializando Google AI...');
    genAI = new GoogleGenerativeAI(API_KEY);
  }
} catch (error) {
  console.error('Error al inicializar Google AI:', error);
  genAI = new GoogleGenerativeAI('temp-key');
}

export const travelAIConfig = {
  model: "gemini-pro",
  temperature: 0.7,
  topK: 1,
  topP: 1,
};

export { genAI };