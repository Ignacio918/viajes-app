import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/RegisterPage.css';

import videoLogin from '../assets/video_login.mp4';
import Logo from '../assets/logo_medium.svg';
import GoogleIcon from '../assets/devicon_google.svg';
import EyeIcon from '../assets/eye.svg';
import EyeOffIcon from '../assets/eye-slash.svg';
import IlusMonumentos from '../assets/ilus_monumentos.svg';
import IlusMezquita from '../assets/ilus_mezquita.svg';
import IlusAvionLogin from '../assets/ilus_avion_login.svg';
import TextField from '../components/TextField';

interface RegisterPageProps {
  onAuthSuccess: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        setError(error.message);
      } else {
        onAuthSuccess();
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Ocurrió un error al intentar registrarse');
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
                    setError('No se completó el registro con Google');
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

    return () => {
        clearInterval(interval);
        if (authListener) authListener.unsubscribe();
    };
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-image-container">
        <video 
          className="register-video"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={videoLogin} type="video/mp4" />
        </video>
      </div>

      <div className="form-container">
        <div className={`register-form-container ${isLoading ? 'form-loading' : ''}`}>
          <div className="register-branding">
            <div className="register-logo">
              <img src={Logo} alt="Zentrip Logo" className="register-logo-image" />
              <div className="register-logo-dot"></div>
            </div>
          </div>

          <div className="register-form-header">
            <span className="register-description">Únete hoy y transforma tus ideas en aventuras reales.</span>
          </div>
          
          <form onSubmit={handleSubmit} className="register-form">
            <TextField
              label="Nombre completo"
              placeholder="Ingresa tu nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              state={error ? 'error' : 'enabled'}
              type="text"
              disabled={isLoading}
            />

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
              placeholder="Ingresa una contraseña"
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

            <TextField
              label="Confirmar contraseña"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              state={error ? 'error' : 'enabled'}
              type={showConfirmPassword ? "text" : "password"}
              disabled={isLoading}
              icon={
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  <img src={showConfirmPassword ? EyeOffIcon : EyeIcon} alt="Toggle password" />
                </button>
              }
            />

            <button 
              type="submit" 
              className={`register-button ${isLoading ? 'button-loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Registrando...
                </>
              ) : (
                'Regístrate'
              )}
            </button>

            <button 
              type="button" 
              onClick={handleGoogleLogin} 
              className={`register-google-button ${isLoading ? 'button-loading' : ''}`}
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
                  Regístrate con Google
                </>
              )}
            </button>

            <div className="register-signup">
              <span className="signup-text">¿Ya tienes una cuenta?</span>
              <span 
                className={`signup-link ${isLoading ? 'pointer-events-none opacity-50' : ''}`} 
                onClick={!isLoading ? handleLoginClick : undefined}
              >
                Inicia sesión
              </span>
            </div>
          </form>

          {error && <p className="register-error">{error}</p>}
        </div>
      </div>

      {/* Ilustraciones */}
      <img src={IlusAvionLogin} alt="Avión" className="illustration" />
      <img src={IlusMezquita} alt="Mezquita" className="illustration" />
      <img src={IlusMonumentos} alt="Monumentos" className="illustration" />
    </div>
  );
};

export default RegisterPage;