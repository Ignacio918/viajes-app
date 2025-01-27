import React, { useState, useEffect } from 'react';
import Tours from './Tours';
import Flights from './Flights';

const TravelTabs: React.FC = () => {
  useEffect(() => {
    console.log('🚨 NUEVO COMPONENTE MONTADO 🚨');
  }, []);

  const [activeTab, setActiveTab] = useState('search');

  return (
    <div style={{backgroundColor: 'red', padding: '20px', margin: '20px'}}>
      <h1>NUEVO COMPONENTE DE TABS</h1>
      <div style={{display: 'flex', gap: '10px'}}>
        {['search', 'tours', 'flights', 'places'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px',
              background: activeTab === tab ? 'blue' : 'gray',
              color: 'white'
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TravelTabs;
