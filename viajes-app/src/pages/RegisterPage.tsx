import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/RegisterPage.css';

import Logo from '../assets/logo_medium.svg';
import FotoRegister from '../assets/foto_registerpage.png';
import AvionIcon from '../assets/ilus_avion_login.svg';
import MezquitaIcon from '../assets/ilus_mezquita.svg';
import MonumentosIcon from '../assets/ilus_monumentos.svg';
import GoogleIcon from '../assets/devicon_google.svg';
import EyeIcon from '../assets/eye.svg';
import EyeOffIcon from '../assets/eye-slash.svg';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setLoading(false);
      setError('Las contraseñas no coinciden');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      onAuthSuccess();
      navigate('/dashboard');
    }
  };

  const handleGoogleRegister = () => {
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
            setError('Error al registrarse con Google');
          }
        });
      }
    }, 1000);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <img className="register-image" src={FotoRegister} alt="Foto de Registro" />
      <div className="register-header">
        <div className="register-logo">
          <img src={Logo} alt="Logo Zentrip" className="register-logo-text" />
          <div className="register-logo-dot"></div>
        </div>
        <div className="register-subtitle">Donde cada viaje comienza con una experiencia fluida y sencilla</div>
      </div>
      <div className="register-form-container">
        <div className="register-form-header">
          <div className="register-title">Crea tu cuenta gratis</div>
          <div className="register-description">Únete hoy y transforma tus ideas en aventuras reales.</div>
        </div>
        <form onSubmit={handleRegister} className="register-form">
          <TextField
            label="Nombre Completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ingresa tu nombre completo"
            required
          />
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
            placeholder="Ingresa una contraseña"
            required
            icon={<img src={showPassword ? EyeOffIcon : EyeIcon} alt="Toggle password" onClick={() => setShowPassword(!showPassword)} />}
          />
          <TextField
            label="Confirmar Contraseña"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirma tu contraseña"
            required
            icon={<img src={showPassword ? EyeOffIcon : EyeIcon} alt="Toggle password" onClick={() => setShowPassword(!showPassword)} />}
          />
          <button type="submit" disabled={loading} className="register-button">
            {loading ? "Cargando..." : "Registrate"}
          </button>
          <button type="button" onClick={handleGoogleRegister} className="register-google-button">
            <img src={GoogleIcon} alt="Google" className="google-icon" />
            Registrate con Google
          </button>
          <div className="register-login">
            <span className="login-text">¿Ya tienes una cuenta?</span>
            <span className="login-link" onClick={handleLoginClick}>Inicia sesión</span>
          </div>
        </form>
        {error && <p className="register-error">{error}</p>}
      </div>
      <div className="register-decorative-rect-1"></div>
      <div className="register-decorative-rect-2"></div>
      <img className="register-icon-avion" src={AvionIcon} alt="Avion" />
      <img className="register-icon-mezquita" src={MezquitaIcon} alt="Mezquita" />
      <img className="register-icon-monumentos" src={MonumentosIcon} alt="Monumentos" />
    </div>
  );
};

export default RegisterPage;