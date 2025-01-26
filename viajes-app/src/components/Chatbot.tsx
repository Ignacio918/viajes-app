import React, { useState, useRef, useEffect } from 'react';
import { genAI, travelAIConfig } from '../config/ai-config';
import '../styles/Chatbot.css';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

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
    setInputMessage('');
    setIsTyping(true);

    try {
      console.log('API Key:', import.meta.env.VITE_GOOGLE_API_KEY); // Esto mostrará si la API key está disponible
      const model = genAI.getGenerativeModel(travelAIConfig);
      console.log('Model created');
      
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
      console.log('Chat started');

      const result = await chat.sendMessage([{ text: inputMessage }]);
      console.log('Message sent, waiting for response');
      const response = await result.response.text();
      console.log('Response received:', response);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Detailed error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-messages">
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

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="¿A dónde te gustaría viajar?"
          className="chat-input"
        />
        <button type="submit" className="send-button">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Chatbot;