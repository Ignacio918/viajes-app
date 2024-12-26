import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Importar ilustraciones e íconos
import Logo from '../assets/logo_zentrip_login.svg';
import Illustration from '../assets/ilustracion-login.svg';
import GoogleIcon from '../assets/devicon_google.svg';
import PasswordIcon from '../assets/pw-icon.svg';
import MailIcon from '../assets/mail-icon.svg';
import EyeIcon from '../assets/eye-slash.svg'; // Icono para ocultar contraseña
import EyeOffIcon from '../assets/eye.svg'; // Icono para mostrar contraseña

// Definir las props que el componente acepta
interface LoginPageProps {
  onAuthSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      if (data) {
        console.log('User data:', data.user);
        console.log('Session data:', data.session);
      }
      onAuthSuccess(); // Llamar a la función pasada como prop
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white overflow-hidden mt-[-90px]">
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Ilustración a la izquierda */}
        <div className="md:w-1/2 flex items-center justify-center bg-white pointer-events-none"> {/* Asegurar que no sea clickeable */}
          <img src={Illustration} alt="Ilustración" className="object-cover w-full h-full" />
        </div>

        {/* Contenido del formulario de login */}
        <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
          {/* Logo en la parte superior */}
          <div className="mb-8">
            <img src={Logo} alt="Logo Zentrip" className="w-48 h-12 object-contain" />
          </div>

          {/* Texto de bienvenida */}
          <div className="mb-8 text-center">
            <h1 className="te-damos-la-bienvenida">Te damos la bienvenida</h1>
            <p className="accede-cuenta">Accede a tu cuenta y empieza a planificar tu viaje</p>
          </div>

          {/* Formulario de Login */}
          <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="email-label">Email</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <img src={MailIcon} alt="Email Icon" className="w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-2 w-full focus:outline-none"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="password-label">Password</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2 relative">
                <img src={PasswordIcon} alt="Password Icon" className="w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ml-2 w-full focus:outline-none"
                  placeholder="Password"
                  required
                />
                <img
                  src={showPassword ? EyeOffIcon : EyeIcon}
                  alt="Toggle Password Visibility"
                  className="w-5 h-5 ml-2 cursor-pointer absolute right-2"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <a href="#" className="olvidaste-tu-contrasena">Olvidaste tu contraseña?</a>
            </div>
            {loading && <p className="text-gray-500">Cargando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="ingresar-button w-full py-2 px-4 bg-primary text-white rounded-full hover:bg-[#3b167d]"
            >
              Ingresar
            </button>
            <button
              type="button"
              className="ingresar-google-button w-full py-2 px-4 bg-white text-primary border border-primary rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <img src={GoogleIcon} alt="Google Icon" className="w-4 h-4 mr-2" />
              Ingresar con Google
            </button>
            <div className="flex items-center justify-center mt-4">
              <div className="flex-grow h-px bg-gray-300 max-w-[42px]"></div>
              <span className="no-tienes-cuenta text-sm text-gray-500 mx-2">¿No tienes cuenta?</span>
              <div className="flex-grow h-px bg-gray-300 max-w-[42px]"></div>
            </div>
            <button
              type="button"
              className="registrarte-button w-full py-2 px-4 bg-[#161616] text-white rounded-full hover:bg-black mt-4"
            >
              Registrarte
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;