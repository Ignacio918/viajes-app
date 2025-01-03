import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/LoginPage.css';

import fotoLogin from '../assets/foto_login.png';
import Logo from '../assets/logo_medium.svg';
import GoogleIcon from '../assets/devicon_google.svg';
import EyeIcon from '../assets/eye.svg';
import EyeOffIcon from '../assets/eye-slash.svg';
import IlusMonumentos from '../assets/ilus_monumentos.svg';
import IlusMezquita from '../assets/ilus_mezquita.svg';
import IlusAvionLogin from '../assets/ilus_avion_login.svg';

interface LoginPageProps {
  onAuthSuccess: () => void;
  handleRegisterClick?: () => void;
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
      <div className="login-background"></div>
      <img
        className="login-image"
        src={fotoLogin}
        alt="Login Image"
      />
      <div className="login-header">
        <div className="login-logo">
          <img src={Logo} alt="Zentrip Logo" className="login-logo-image" />
          <div className="login-logo-dot"></div>
        </div>
        <div className="login-subtitle">Donde cada viaje comienza con una experiencia fluida y sencilla</div>
      </div>
      <div className="login-form-container">
        <div className="login-form-header">
          <div className="login-title">Iniciar sesión</div>
          <div className="login-description">Accede a tus planes de viaje y haz realidad tus ideas.</div>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-input-group">
            <div className="login-input-container">
              <div className="login-input-label">Email</div>
              <div className="login-input">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu email" />
              </div>
            </div>
            <div className="login-input-container">
              <div className="login-input-label">Contraseña</div>
              <div className="login-input">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" />
                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  <img src={showPassword ? EyeOffIcon : EyeIcon} alt="Toggle password" />
                </button>
              </div>
            </div>
          </div>
          <div className="login-forgot-password">Olvidaste tu contraseña?</div>
          <button type="submit" className="login-button">{loading ? "Cargando..." : "Ingresar"}</button>
          <button type="button" onClick={handleGoogleLogin} className="login-google-button">
            <img src={GoogleIcon} alt="Google" className="google-icon" />
            Ingresar con Google
          </button>
          <div className="login-signup">
            <span className="signup-text">¿Aún no te unes?</span>
            <span className="signup-link" onClick={handleRegisterClick}>Registrate ahora</span>
          </div>
        </form>
        {error && <p className="login-error">{error}</p>}
      </div>
      <div className="login-decorative-rect-1"></div>
      <div className="login-decorative-rect-2"></div>
      <img src={IlusAvionLogin} alt="Avion" className="login-icon" />
      <img src={IlusMezquita} alt="Mezquita" className="login-icon" />
      <img src={IlusMonumentos} alt="Monumentos" className="login-icon" />
    </div>
  );
};

export default LoginPage;