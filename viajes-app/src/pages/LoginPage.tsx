import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/LoginPage.css';
import FormSkeleton from '../components/FormSkeleton';

import videoLogin from '../assets/video_login.mp4';
import Logo from '../assets/logo_medium.svg';
import GoogleIcon from '../assets/devicon_google.svg';
import EyeIcon from '../assets/eye.svg';
import EyeOffIcon from '../assets/eye-slash.svg';
import IlusMonumentos from '../assets/ilus_monumentos.svg';
import IlusMezquita from '../assets/ilus_mezquita.svg';
import IlusAvionLogin from '../assets/ilus_avion_login.svg';
import TextField from '../components/TextField';

interface LoginPageProps {
  onAuthSuccess: () => void;
  handleRegisterClick?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onAuthSuccess, handleRegisterClick }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulamos carga inicial de la página con progreso
    const duration = 1000; // 1 segundo
    const interval = 10; // Actualizar cada 10ms
    let progress = 0;
    
    const timer = setInterval(() => {
      progress += (interval / duration) * 100;
      setLoadingProgress(Math.min(progress, 100));
      
      if (progress >= 100) {
        clearInterval(timer);
        setIsPageLoading(false);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        onAuthSuccess();
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Ocurrió un error al intentar iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
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
      setIsLoading(false);
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
          setIsLoading(false);
        });
      }
    }, 1000);
  };

  if (isPageLoading) {
    return (
      <div className="login-container">
        <div className="login-image-container">
          <video 
            className="login-video"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={videoLogin} type="video/mp4" />
          </video>
        </div>
        <div className="form-container">
          <div className="login-form-container">
            <div className="loading-progress-bar">
              <div 
                className="loading-progress-fill"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <FormSkeleton />
          </div>
        </div>
        {/* Ilustraciones */}
        <img src={IlusAvionLogin} alt="Avión" className="illustration" />
        <img src={IlusMezquita} alt="Mezquita" className="illustration" />
        <img src={IlusMonumentos} alt="Monumentos" className="illustration" />
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-image-container">
        <video 
          className="login-video"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={videoLogin} type="video/mp4" />
        </video>
      </div>

      <div className="form-container">
        <div className={`login-form-container ${isLoading ? 'form-loading' : ''}`}>
          <div className="login-branding">
            <div className="login-logo">
              <img src={Logo} alt="Zentrip Logo" className="login-logo-image" />
              <div className="login-logo-dot"></div>
            </div>
          </div>

          <div className="login-form-header">
            <span className="login-description">Accede a tus planes de viaje y haz realidad tus ideas.</span>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            <TextField
              label="Email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              state={error ? 'error' : 'enabled'}
              type="email"
              disabled={isLoading}
            />
            
            <TextField
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              state={error ? 'error' : 'enabled'}
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
              icon={
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <img src={showPassword ? EyeOffIcon : EyeIcon} alt="Toggle password" />
                </button>
              }
            />

            <Link 
              to="/forgot-password" 
              className={`login-forgot-password ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
            >
              Olvidaste tu contraseña?
            </Link>

            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'button-loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Ingresando...
                </>
              ) : (
                'Ingresar'
              )}
            </button>

            <button 
              type="button" 
              onClick={handleGoogleLogin} 
              className={`login-google-button ${isLoading ? 'button-loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Conectando...
                </>
              ) : (
                <>
                  <img src={GoogleIcon} alt="Google" className="google-icon" />
                  Ingresar con Google
                </>
              )}
            </button>

            <div className="login-signup">
              <span className="signup-text">¿Aún no te unes?</span>
              <span 
                className={`signup-link ${isLoading ? 'pointer-events-none opacity-50' : ''}`} 
                onClick={!isLoading ? handleRegisterClick : undefined}
              >
                Regístrate ahora
              </span>
            </div>
          </form>

          {error && <p className="login-error">{error}</p>}
        </div>
      </div>

      {/* Ilustraciones */}
      <img src={IlusAvionLogin} alt="Avión" className="illustration" />
      <img src={IlusMezquita} alt="Mezquita" className="illustration" />
      <img src={IlusMonumentos} alt="Monumentos" className="illustration" />
    </div>
  );
};

export default LoginPage;