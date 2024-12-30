import React, { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

import Logo from '../assets/logo_zentrip_login.svg';
import Illustration from '../assets/ilustracion-login.svg';
import GoogleIcon from '../assets/devicon_google.svg';
import PasswordIcon from '../assets/pw-icon.svg';
import MailIcon from '../assets/mail-icon.svg';
import EyeIcon from '../assets/eye-slash.svg';
import EyeOffIcon from '../assets/eye.svg';

interface LoginPageProps {
  onAuthSuccess: () => void;
  handleRegisterClick: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onAuthSuccess, handleRegisterClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      if (data) {
        console.log('User data:', data.user);
        console.log('Session data:', data.session);
      }
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

  const handleRegisterButtonClick = () => {
    if (location.pathname === '/login') {
      navigate('/registerform');
    } else {
      handleRegisterClick();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-white)]">
      <div className="w-full max-w-[1440px] flex items-center">
        {/* Lado izquierdo - Ilustración */}
        <div className="w-[704px] h-[781px] relative ml-[68px]">
          <img 
            src={Illustration} 
            alt="Ilustración"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Lado derecho - Formulario */}
        <div className="flex-1 flex flex-col items-center justify-center pl-[114px]">
          <div className="w-[421px] flex flex-col items-center">
            {/* Logo */}
            <div className="w-[194px] h-[72px] relative mb-[14px]">
              <img 
                src={Logo} 
                alt="Logo Zentrip"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Título y Subtítulo */}
            <div className="self-stretch text-[var(--color-text-primary)] font-urbanist text-[40px] font-medium mb-[14px]">
              Te damos la bienvenida
            </div>
            <div className="self-stretch text-center text-[var(--color-text-primary)] text-[16px] font-urbanist mb-[14px]">
              Accede a tu cuenta y empieza a planificar tu viaje
            </div>

            {/* Formulario */}
            <form onSubmit={handleLogin} className="flex flex-col items-center gap-[14px] self-stretch w-full">
              <div className="flex flex-col items-end gap-[14px] self-stretch">
                {/* Email Input */}
                <div className="flex flex-col items-start self-stretch">
                  <div className="flex items-center w-full p-[8px] rounded-lg border-2 border-[var(--color-border)] bg-[var(--color-white)] hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary)]">
                    <div className="flex items-center gap-[8px]">
                      <div className="w-6 h-6 flex justify-center items-center">
                        <img src={MailIcon} alt="Email" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full font-urbanist text-[14px] text-[var(--color-text-secondary)] bg-transparent focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="flex flex-col items-start self-stretch">
                  <div className="flex items-center w-full p-[8px] rounded-lg border-2 border-[var(--color-border)] bg-[var(--color-white)] hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary)]">
                    <div className="flex items-center gap-[8px] flex-1">
                      <div className="w-6 h-6 flex justify-center items-center">
                        <img src={PasswordIcon} alt="Password" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="w-full font-urbanist text-[14px] text-[var(--color-text-secondary)] bg-transparent focus:outline-none"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex justify-center items-center w-7 h-6"
                    >
                      <img src={showPassword ? EyeOffIcon : EyeIcon} alt="Toggle password" />
                    </button>
                  </div>
                </div>

                {/* Olvidaste tu contraseña */}
                <button
                  type="button"
                  className="text-[var(--color-primary)] text-[14px] font-urbanist hover:underline transition-all duration-200"
                >
                  Olvidaste tu contraseña?
                </button>
              </div>

              {/* Botones */}
              <div className="flex flex-col gap-[14px] w-full">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary button-hover-effect flex justify-center items-center gap-[10px] self-stretch p-[10px] h-[40px] rounded-full text-[var(--color-white)] text-[16px] font-urbanist transition-all duration-200"
                >
                  {loading ? "Cargando..." : "Ingresar"}
                </button>

                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  className="btn-secondary button-hover-effect flex justify-center items-center gap-[10px] self-stretch p-[10px] h-[40px] rounded-full text-[var(--color-primary)] text-[16px] font-urbanist transition-all duration-200"
                >
                  <img src={GoogleIcon} alt="Google" className="w-4 h-4 ml-2" />
                  <span>Ingresar con Google</span>
                </button>

                {/* Separador */}
                <div className="flex justify-center items-center gap-[4px] w-[215px] mx-auto">
                  <div className="flex-1 h-[1px] bg-[var(--color-separator)]" />
                  <span className="text-[var(--color-text-secondary)] text-[14px] font-urbanist px-[4px]">
                    ¿No tienes cuenta?
                  </span>
                  <div className="flex-1 h-[1px] bg-[var(--color-separator)]" />
                </div>

                {/* Botón Registrarte */}
                <button
                  type="button"
                  onClick={handleRegisterButtonClick}
                  className="btn-dark button-hover-effect flex justify-center items-center gap-[10px] self-stretch p-[10px] h-[40px] rounded-full text-[var(--color-white)] text-[16px] font-urbanist transition-all duration-200"
                >
                  Registrarte
                </button>
              </div>
            </form>

            {error && (
              <p className="mt-4 text-red-500 text-center text-sm font-urbanist">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;