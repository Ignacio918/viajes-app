import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/RegisterPage.css';

// Importamos los mismos assets que usamos en LoginPage
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

interface FormValidation {
  isValid: boolean;
  message: string;
}

interface FormState {
  fullName: FormValidation;
  email: FormValidation;
  password: FormValidation;
  confirmPassword: FormValidation;
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
  const [formValidation, setFormValidation] = useState<FormState>({
    fullName: { isValid: false, message: '' },
    email: { isValid: false, message: '' },
    password: { isValid: false, message: '' },
    confirmPassword: { isValid: false, message: '' }
  });

  // Validación de nombre completo
  const validateFullName = (name: string): FormValidation => {
    if (!name.trim()) {
      return { isValid: false, message: 'El nombre es requerido' };
    }
    if (name.length < 3) {
      return { isValid: false, message: 'El nombre debe tener al menos 3 caracteres' };
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
      return { isValid: false, message: 'El nombre solo puede contener letras' };
    }
    return { isValid: true, message: 'Nombre válido' };
  };

  // Validación de email
  const validateEmail = (email: string): FormValidation => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return { isValid: false, message: 'El email es requerido' };
    }
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Email inválido' };
    }
    return { isValid: true, message: 'Email válido' };
  };

  // Validación de contraseña
  const validatePassword = (pass: string): FormValidation => {
    if (!pass) {
      return { isValid: false, message: 'La contraseña es requerida' };
    }
    if (pass.length < 8) {
      return { isValid: false, message: 'Mínimo 8 caracteres' };
    }
    if (!/[A-Z]/.test(pass)) {
      return { isValid: false, message: 'Debe incluir al menos una mayúscula' };
    }
    if (!/[0-9]/.test(pass)) {
      return { isValid: false, message: 'Debe incluir al menos un número' };
    }
    if (!/[!@#$%^&*]/.test(pass)) {
      return { isValid: false, message: 'Debe incluir al menos un carácter especial (!@#$%^&*)' };
    }
    return { isValid: true, message: 'Contraseña válida' };
  };

  // Validación de confirmación de contraseña
  const validateConfirmPassword = (confirm: string): FormValidation => {
    if (!confirm) {
      return { isValid: false, message: 'Debe confirmar la contraseña' };
    }
    if (confirm !== password) {
      return { isValid: false, message: 'Las contraseñas no coinciden' };
    }
    return { isValid: true, message: 'Las contraseñas coinciden' };
  };

  // Efecto para validar en tiempo real
  useEffect(() => {
    setFormValidation({
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword)
    });
  }, [fullName, email, password, confirmPassword]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validar todo el formulario antes de enviar
    const allValidations = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword)
    };

    setFormValidation(allValidations);

    if (!Object.values(allValidations).every(v => v.isValid)) {
      setError('Por favor, corrige los errores en el formulario');
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

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
      if (error) throw error;
    } catch (error) {
      setError('Error al intentar registrarse con Google');
    } finally {
      setIsLoading(false);
    }
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
            <span className="login-description">Únete hoy y transforma tus ideas en aventuras reales.</span>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <TextField
              label="Nombre completo"
              placeholder="Ingresa tu nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              state={formValidation.fullName.isValid ? 'success' : fullName ? 'error' : 'enabled'}
              type="text"
              disabled={isLoading}
              helperText={fullName ? formValidation.fullName.message : ''}
            />

            <TextField
              label="Email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              state={formValidation.email.isValid ? 'success' : email ? 'error' : 'enabled'}
              type="email"
              disabled={isLoading}
              helperText={email ? formValidation.email.message : ''}
            />
            
            <TextField
              label="Contraseña"
              placeholder="Ingresa una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              state={formValidation.password.isValid ? 'success' : password ? 'error' : 'enabled'}
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
              helperText={password ? formValidation.password.message : ''}
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
              state={formValidation.confirmPassword.isValid ? 'success' : confirmPassword ? 'error' : 'enabled'}
              type={showConfirmPassword ? "text" : "password"}
              disabled={isLoading}
              helperText={confirmPassword ? formValidation.confirmPassword.message : ''}
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
              className={`login-button ${isLoading ? 'button-loading' : ''}`}
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
                  Regístrate con Google
                </>
              )}
            </button>

            <div className="login-signup">
              <span className="signup-text">¿Ya tienes una cuenta?</span>
              <span 
                className={`signup-link ${isLoading ? 'pointer-events-none opacity-50' : ''}`} 
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
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

export default RegisterPage;