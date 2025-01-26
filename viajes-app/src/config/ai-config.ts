import { GoogleGenerativeAI } from '@google/generative-ai';

export const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY!);

export const travelAIConfig = {
  model: "gemini-pro",
  temperature: 0.7,
  topK: 1,
  topP: 1,
};