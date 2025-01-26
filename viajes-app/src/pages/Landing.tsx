import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../pages/HeroSection';
import { TypewriterEffectSmooth } from '../components/ui/typewriter-effect';
import Tours from '../components/Tours';
import Flights from '../components/Flights';
import Places from '../components/Places';
import Packages from '../components/Packages';
import Chatbot from '../components/Chatbot';
import '../styles/Landing.css';

const Landing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'tours' | 'flights' | 'places'>('search');
  
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

  return (
    <div className="landing-container">
      <Navbar />
      <HeroSection />

      <section className="chat-section">
        <div className="chat-container">
          <TypewriterEffectSmooth words={words} />
          <div className="chat-input-wrapper">
            <input
              type="text"
              placeholder="Describe tu viaje ideal..."
              className="chat-input"
            />
            <button className="chat-button">
              <svg className="send-icon" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
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
  );
};

export default Landing;