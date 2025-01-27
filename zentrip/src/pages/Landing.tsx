import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../pages/HeroSection';
import { TypewriterEffectSmooth } from '../components/ui/typewriter-effect';
import Tours from '../components/Tours';
import Flights from '../components/Flights';
import Places from '../components/Places';
import Packages from '../components/Packages';
import { genAI, travelAIConfig } from '../config/ai-config';
import '../styles/Landing.css';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Landing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'tours' | 'flights' | 'places'>('search');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isApiKeyAvailable, setIsApiKeyAvailable] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const words = [
    {
      text: "¿Buscas un viaje a medida?",
      className: "typewriter-primary",
    },
    {
      text: "Dime a dónde quieres ir...",
      className: "typewriter-secondary",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkApiKey = async () => {
      const hasKey = !!import.meta.env.VITE_GOOGLE_API_KEY;
      console.log('API Key disponible:', hasKey);
      setIsApiKeyAvailable(hasKey);
    };
    checkApiKey();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado');

    if (!inputMessage.trim()) {
      console.log('Mensaje vacío, ignorando');
      return;
    }

    console.log('Procesando mensaje:', inputMessage);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      if (!import.meta.env.VITE_GOOGLE_API_KEY) {
        throw new Error('API key no configurada');
      }

      console.log('Inicializando chat...');
      const model = genAI.getGenerativeModel({
        ...travelAIConfig,
      });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Actúa como un experto asistente de viajes que ayuda a planificar itinerarios y dar recomendaciones de viaje. Responde en español." }],
          },
          {
            role: "model",
            parts: [{ text: "¡Hola! Soy tu asistente de viajes personal. Estoy aquí para ayudarte a planificar el viaje perfecto. ¿En qué puedo ayudarte?" }],
          },
        ],
      });

      console.log('Enviando mensaje a la API...');
      const result = await chat.sendMessage([{ text: currentInput }]);
      const response = await result.response.text();
      console.log('Respuesta recibida:', response);

      if (!response) {
        throw new Error('Respuesta vacía del modelo');
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Error en el chat:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Error: ${error.message || 'Error desconocido al procesar el mensaje'}`,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="landing-container">
      <Navbar />
      <HeroSection />

      <div className="main-content">
        <section className="chat-section">
          <div className="chat-container">
            <TypewriterEffectSmooth words={words} />

            <div className="chat-interface">
              <div className="messages-container">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
                  >
                    {message.content}
                  </div>
                ))}
                {isTyping && (
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="chat-input-wrapper">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={handleInputChange}
                  placeholder="Describe tu viaje ideal..."
                  className="chat-input"
                />
                <button
                  type="submit"
                  className="chat-button"
                  disabled={!isApiKeyAvailable || isTyping}
                >
                  <svg className="send-icon" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="tabs-section">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-4 border-b border-gray-200">
              {['search', 'tours', 'flights', 'places'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 ${
                    activeTab === tab 
                      ? 'text-pink-600 border-b-2 border-pink-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="py-6">
              {activeTab === 'search' && (
                <div className="search-form">
                  <input
                    type="text"
                    placeholder="¿A dónde vas?"
                    className="p-3 border rounded-lg"
                  />
                  <input type="date" className="p-3 border rounded-lg" />
                  <button className="p-3 bg-pink-600 text-white rounded-lg">
                    Buscar
                  </button>
                </div>
              )}
              {activeTab === 'tours' && <Tours />}
              {activeTab === 'flights' && <Flights />}
              {activeTab === 'places' && <Places />}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;