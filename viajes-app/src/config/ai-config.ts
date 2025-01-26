import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI;

try {
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  genAI = new GoogleGenerativeAI(API_KEY);
} catch (error) {
  console.warn('Warning: API key not configured yet');
  // Crear una instancia temporal para evitar errores
  genAI = new GoogleGenerativeAI('temp-key');
}

export const travelAIConfig = {
  model: "gemini-pro",
  temperature: 0.7,
  topK: 1,
  topP: 1,
};

export { genAI };