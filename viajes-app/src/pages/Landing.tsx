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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };
    console.log('User message:', userMessage);

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      if (!import.meta.env.VITE_GOOGLE_API_KEY) {
        throw new Error('API key no encontrada');
      }
      console.log('API Key disponible:', !!import.meta.env.VITE_GOOGLE_API_KEY);

      const model = genAI.getGenerativeModel(travelAIConfig);
      console.log('Modelo creado exitosamente');

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
      console.log('Chat iniciado');

      console.log('Enviando mensaje:', currentInput);
      const result = await chat.sendMessage([{ text: currentInput }]);
      console.log('Mensaje enviado, esperando respuesta...');
      
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

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Error detallado:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Lo siento, hubo un error: ${error.message || 'Error desconocido'}`,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
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
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Describe tu viaje ideal..."
                  className="chat-input"
                />
                <button type="submit" className="chat-button">
                  <svg className="send-icon" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="tabs-section">
          <div className="tabs-container">
            <div className="tabs-navigation">
              {['search', 'tours', 'flights', 'places'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="tabs-content">
              {activeTab === 'search' && (
                <div className="search-form">
                  <input
                    type="text"
                    placeholder="¿A dónde vas?"
                    className="destination-input"
                  />
                  <input
                    type="date"
                    className="date-input"
                  />
                  <button className="search-button">
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