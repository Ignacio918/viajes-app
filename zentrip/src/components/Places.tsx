import React, { useState } from 'react';

const Places: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Búsqueda:', searchQuery);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Buscar Destinos</h2>
      
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="¿A dónde quieres ir?"
            className="flex-1 p-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-pink-600 text-white rounded-lg 
                     hover:bg-pink-700 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Places;