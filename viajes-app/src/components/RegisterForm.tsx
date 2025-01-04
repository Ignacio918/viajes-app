import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css'; // Importamos el archivo CSS específico para RegisterPage

import Logo from '../assets/logo_medium.svg';
import Illustration from '../assets/foto_login.png';
import GoogleIcon from '../assets/devicon_google.svg';
import EyeIcon from '../assets/eye.svg';
import EyeOffIcon from '../assets/eye-slash.svg';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    // Lógica de registro aquí
  };

  const handleGoogleRegister = () => {
    // Lógica de registro con Google aquí
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <img className="register-image" src={Illustration} alt="Ilustración" />
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
          <div className="register-input-group">
            <div className="register-input-label">Nombre Completo</div>
            <div className="register-input">
              <input type="text" placeholder="Ingresa tu nombre completo" required />
            </div>
          </div>
          <div className="register-input-group">
            <div className="register-input-label">Email</div>
            <div className="register-input">
              <input type="email" placeholder="Ingresa tu email" required />
            </div>
          </div>
          <div className="register-input-group">
            <div className="register-input-label">Contraseña</div>
            <div className="register-input">
              <input type={showPassword ? "text" : "password"} placeholder="Ingresa una contraseña" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
                <img src={showPassword ? EyeOffIcon : EyeIcon} alt="Toggle password" />
              </button>
            </div>
          </div>
          <div className="register-input-group">
            <div className="register-input-label">Confirmar Contraseña</div>
            <div className="register-input">
              <input type={showPassword ? "text" : "password"} placeholder="Confirma tu contraseña" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
                <img src={showPassword ? EyeOffIcon : EyeIcon} alt="Toggle password" />
              </button>
            </div>
          </div>
          <button type="submit" className="register-button">Registrate</button>
          <button type="button" onClick={handleGoogleRegister} className="register-google-button">
            <img src={GoogleIcon} alt="Google" className="google-icon" />
            Registrate con Google
          </button>
          <div className="register-login">
            <span className="login-text">¿Ya tienes una cuenta?</span>
            <span className="login-link" onClick={handleLoginClick}>Inicia sesión</span>
          </div>
        </form>
      </div>
      <div className="register-decorative-rect-1"></div>
      <div className="register-decorative-rect-2"></div>
    </div>
  );
};

export default RegisterPage;