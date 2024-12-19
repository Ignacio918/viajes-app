import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthPageProps {
  type: 'login' | 'register';
  onAuthSuccess: () => void;
  onBack: () => void; // Prop para manejar el botón de volver atrás
}

const AuthPage: React.FC<AuthPageProps> = ({ type, onAuthSuccess, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <button onClick={onBack} className="self-start mb-4 text-gray-600 hover:text-gray-900">← Volver</button>
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="hidden md:block md:w-1/2 bg-cover" style={{ backgroundImage: `url('https://source.unsplash.com/random')` }}></div>
        <div className="w-full md:w-1/2 p-8">
          {type === 'login' ? (
            <>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Iniciar Sesión</h2>
              <LoginForm onLogin={onAuthSuccess} />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Registrarse</h2>
              <RegisterForm onRegister={onAuthSuccess} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;