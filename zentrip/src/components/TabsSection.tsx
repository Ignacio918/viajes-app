import React, { useState } from 'react';
import Places from './Places';

const TabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('search');

  console.log('TabsSection rendering, activeTab:', activeTab); // Debug log

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tabs Navigation */}
        <div className="flex space-x-1 border-b border-gray-200">
          {['search', 'tours', 'flights', 'places'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-2 text-sm font-medium transition-colors
                ${activeTab === tab 
                  ? 'text-pink-600 border-b-2 border-pink-600' 
                  : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tabs Content */}
        <div className="mt-6">
          {activeTab === 'search' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="¿A dónde vas?"
                className="p-3 border rounded-lg"
              />
              <input 
                type="date" 
                className="p-3 border rounded-lg"
              />
              <button className="p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                Buscar
              </button>
            </div>
          )}
          
          {activeTab === 'places' && <Places />}
          
          {activeTab === 'tours' && (
            <div className="text-center py-8 text-gray-500">
              Sección de Tours en desarrollo
            </div>
          )}
          
          {activeTab === 'flights' && (
            <div className="text-center py-8 text-gray-500">
              Sección de Vuelos en desarrollo
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TabsSection;
