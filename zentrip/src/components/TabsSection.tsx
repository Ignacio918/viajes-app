import React, { useState } from 'react';
import Tours from './Tours';
import Flights from './Flights';

const TabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="tabs-container">
      <div className="tabs-navigation">
        {['search', 'tours', 'flights', 'places'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
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
              className="destination-input"
              placeholder="¿A dónde vas?"
            />
            <input type="date" className="date-input" />
            <button className="search-button">Buscar</button>
          </div>
        )}

        {activeTab === 'places' && (
          <div className="search-form">
            <input
              type="text"
              className="destination-input"
              placeholder="¿A dónde quieres ir?"
            />
            <button className="search-button">Buscar</button>
          </div>
        )}

        {activeTab === 'tours' && <Tours />}
        {activeTab === 'flights' && <Flights />}
      </div>
    </div>
  );
};

export default TabsSection;
