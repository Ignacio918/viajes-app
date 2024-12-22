import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface RegisterFormProps {
  onRegister: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      if (data) {
        console.log('User data:', data.user);
        console.log('Session data:', data.session);
      }
      onRegister();
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          required
        />
      </div>
      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;