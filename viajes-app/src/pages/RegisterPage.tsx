import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import TextField from '../components/TextField';
import '../styles/RegisterPage.css';
import Logo from '../assets/logo_medium.svg';
import GoogleIcon from '../assets/devicon_google.svg';
import IlusAvionLogin from '../assets/ilus_avion_login.svg';
import IlusMezquita from '../assets/ilus_mezquita.svg';
import IlusMonumentos from '../assets/ilus_monumentos.svg';
import EyeIcon from '../assets/eye.svg';
import EyeOffIcon from '../assets/eye-slash.svg';

interface RegisterPageProps {
  onAuthSuccess: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
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
    <div className="register-container">
      <div className="register-background"></div>
      <img
        className="register-image"
        src={IlusAvionLogin}
        alt="Avion"
      />
      <div className="register-header">
        <div className="register-logo">
          <img src={Logo} alt="Zentrip Logo" className="register-logo-image" />
          <div className="register-logo-dot"></div>
        </div>
        <div className="register-subtitle">Únete a nosotros y comienza a planificar tus viajes sin esfuerzo</div>
      </div>
      <div className="register-form-container">
        <div className="register-form-header">
          <div className="register-title">Registro</div>
          <div className="register-description">Crea una cuenta para comenzar a organizar tus planes de viaje.</div>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-input-group">
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Ingresa tu email"
              required={true}
              state="enabled"
            />
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Ingresa tu contraseña"
              required={true}
              state="enabled"
              icon={
                showPassword ? (
                  <img src={EyeOffIcon} alt="Ocultar contraseña" onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <img src={EyeIcon} alt="Mostrar contraseña" onClick={() => setShowPassword(!showPassword)} />
                )
              }
            />
            <TextField
              label="Confirmar Contraseña"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirma tu contraseña"
              required={true}
              state="enabled"
              icon={
                showConfirmPassword ? (
                  <img src={EyeOffIcon} alt="Ocultar contraseña" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                ) : (
                  <img src={EyeIcon} alt="Mostrar contraseña" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                )
              }
            />
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
          <button type="button" onClick={handleGoogleLogin} className="mt-4 bg-white text-black py-2 px-4 rounded border border-gray-300 flex items-center justify-center gap-2">
            <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
            Registrarse con Google
          </button>
        </form>
      </div>
      <div className="register-decorative-rect-1"></div>
      <div className="register-decorative-rect-2"></div>
      <img src={IlusMezquita} alt="Mezquita" className="register-icon" />
      <img src={IlusMonumentos} alt="Monumentos" className="register-icon" />
    </div>
  );
};

export default RegisterPage;