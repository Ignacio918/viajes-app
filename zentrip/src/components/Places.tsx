import React from 'react';

const Places: React.FC = () => {
  console.log('Places component rendering'); // Debug log

  return (
    <div className="places-container">
      <h2 className="text-2xl font-bold mb-6">Buscar Destinos</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="¿A dónde quieres ir?"
          className="flex-1 p-3 border rounded-lg"
        />
        <button 
          className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          onClick={() => console.log('Search button clicked')}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default Places;