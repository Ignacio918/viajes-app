import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/LoginPage.css';

import videoLogin from '../assets/video_login.mp4';
import Logo from '../assets/logo_medium.svg';
import GoogleIcon from '../assets/icons/devicon_google.svg';
import EyeIcon from '../assets/icons/eye.svg';
import EyeOffIcon from '../assets/icons/eye-slash.svg';
import IlusMonumentos from '../assets/illustrations/ilus_monumentos.svg';
import IlusMezquita from '../assets/illustrations/ilus_mezquita.svg';
import IlusAvionLogin from '../assets/illustrations/ilus_avion_login.svg';
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
  const [error, setError] = useState('');

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
    setError('');
    
    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    
    let authListener: any = null;
    let popupClosed = false;

    // Configuramos el listener de autenticación antes de abrir el popup
    authListener = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
            onAuthSuccess();
            navigate('/dashboard');
            if (authListener) authListener.unsubscribe();
        }
    });
    
    const popup = window.open(
        `https://szloqueilztpbdurfowm.supabase.co/auth/v1/authorize?provider=google&redirect_to=https://zentrip.vercel.app/dashboard`,
        'GoogleSignIn',
        `width=${width},height=${height},top=${top},left=${left}`
    );

    if (!popup) {
        setError('No se pudo abrir el popup para la autenticación de Google.');
        setIsLoading(false);
        if (authListener) authListener.unsubscribe();
        return;
    }

    const interval = setInterval(async () => {
        if (popup.closed && !popupClosed) {
            popupClosed = true;
            clearInterval(interval);
            
            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                
                if (sessionError) throw sessionError;

                if (!session?.user?.id) {
                    setError('No se completó el inicio de sesión con Google');
                    if (authListener) authListener.unsubscribe();
                }
            } catch (error) {
                console.error('Error al verificar sesión:', error);
                setError('Error al verificar la sesión');
                if (authListener) authListener.unsubscribe();
            }
            
            setIsLoading(false);
        }
    }, 1000);

    // Limpieza al desmontar
    return () => {
        clearInterval(interval);
        if (authListener) authListener.unsubscribe();
    };
  };

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