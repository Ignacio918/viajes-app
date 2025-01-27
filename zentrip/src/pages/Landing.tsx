import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../pages/HeroSection';
import { TypewriterEffectSmooth } from '../components/ui/typewriter-effect';
import Tours from '../components/Tours';
import Flights from '../components/Flights';
import Places from '../components/Places';
import Packages from '../components/Packages';
import '../styles/Landing.css';

// Interface for the message structure
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

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Use effect to scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle input change for the chat input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  // Handle sending message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Simulate sending message and receiving a response
      const response = "Simulated response for the input: " + currentInput;
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Error: ${error.message || 'Error desconocido al procesar el mensaje'}`,
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
                  <div key={message.id} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
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
                <button type="submit" className="chat-button" disabled={isTyping}>
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
                <button key={tab} onClick={() => setActiveTab(tab as any)} className={`tab-button ${activeTab === tab ? 'active' : ''}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="tabs-content">
              {activeTab === 'search' && (
                <div className="search-form">
                  <input type="text" placeholder="¿A dónde vas?" className="destination-input" />
                  <input type="date" className="date-input" />
                  <button className="search-button">Buscar</button>
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