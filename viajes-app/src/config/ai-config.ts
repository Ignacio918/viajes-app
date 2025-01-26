import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error('La API key de Google no está configurada en las variables de entorno.');
}

export const genAI = new GoogleGenerativeAI(API_KEY);

export const travelAIConfig = {
  model: "gemini-pro",
  temperature: 0.7,
  topK: 1,
  topP: 1,
};