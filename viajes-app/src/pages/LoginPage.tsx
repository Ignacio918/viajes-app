import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/LoginPage.css';

import Logo from '../assets/logo_medium.svg';
import GoogleIcon from '../assets/devicon_google.svg';
import EyeIcon from '../assets/eye.svg';
import EyeOffIcon from '../assets/eye-slash.svg';
import TextField from '../components/TextField';

interface LoginPageProps {
  onAuthSuccess: () => void;
  handleRegisterClick?: () => void; // Asegúrate de definir esta propiedad si la necesitas
}

const LoginPage: React.FC<LoginPageProps> = ({ onAuthSuccess, handleRegisterClick }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      onAuthSuccess();
      navigate('/dashboard');
    }
  };

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    const popup = window.open(
      `https://szloqueilztpbdurfowm.supabase.co/auth/v1/authorize?provider=google&redirect_to=https://zentrip.vercel.app/dashboard`,
      'GoogleSignIn',
      `width=${width},height=${height},top=${top},left=${left}`
    );

    if (!popup) {
      setError('No se pudo abrir el popup para la autenticación de Google.');
      return;
    }

    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            onAuthSuccess();
            navigate('/dashboard');
          } else {
            setError('Error al iniciar sesión con Google');
          }
        });
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={Logo} alt="Logo Zentrip" className="login-logo" />
      </div>
      <div className="login-form-container">
        <h2>Inicia sesión en tu cuenta</h2>
        <form onSubmit={handleLogin} className="login-form">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email"
            required
          />
          <TextField
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
            icon={<img src={showPassword ? EyeOffIcon : EyeIcon} alt="Toggle password" onClick={() => setShowPassword(!showPassword)} />}
          />
          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Cargando..." : "Inicia sesión"}
          </button>
          <button type="button" onClick={handleGoogleLogin} className="login-google-button">
            <img src={GoogleIcon} alt="Google" className="google-icon" />
            Inicia sesión con Google
          </button>
          <div className="login-register">
            <span>¿No tienes una cuenta?</span>
            <span className="register-link" onClick={handleRegisterClick}>Regístrate</span>
          </div>
        </form>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;