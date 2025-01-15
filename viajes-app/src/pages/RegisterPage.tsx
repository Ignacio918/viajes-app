import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/RegisterPage.css';

// Importamos los iconos necesarios
import Logo from '../assets/logo_medium.svg';
import GoogleIcon from '../assets/icons/devicon_google.svg';
import EyeIcon from '../assets/icons/eye.svg';
import EyeOffIcon from '../assets/icons/eye-slash.svg';
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
    <div className="register-page">
      <div className="register-container">
        <div className="register-form">
          <div className="form-header">
            <img src={Logo} alt="Zentrip Logo" className="logo" />
            <h2 className="form-title">Únete a Zentrip</h2>
            <p className="form-description">Transforma tus ideas en aventuras reales</p>
          </div>

          <form onSubmit={handleSubmit} className="form-content">
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
              className="submit-button"
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

            <div className="divider">
              <span>O continúa con</span>
            </div>

            <button 
              type="button" 
              onClick={handleGoogleLogin} 
              className="google-button"
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
                  Continuar con Google
                </>
              )}
            </button>

            <div className="login-link">
              <span>¿Ya tienes una cuenta?</span>
              <button 
                type="button"
                className="link"
                onClick={() => navigate('/login')}
                disabled={isLoading}
              >
                Inicia sesión
              </button>
            </div>
          </form>

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;