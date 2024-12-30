import { useState, FormEvent, FC } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Logo from "../assets/logo_zentrip_login.svg";
import Illustration from "../assets/ilustracion-login.svg";
import GoogleIcon from "../assets/devicon_google.svg";
import PasswordIcon from "../assets/pw-icon.svg";
import MailIcon from "../assets/mail-icon.svg";
import EyeIcon from "../assets/eye-slash.svg";
import EyeOffIcon from "../assets/eye.svg";
import UserIcon from "../assets/user-icon.svg";

interface RegisterFormProps {
  onAuthSuccess: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      // Primero actualizamos el estado de éxito
      setSuccess(true);

      // Llamamos a onAuthSuccess para actualizar el estado de autenticación
      onAuthSuccess();

      // Aseguramos que la navegación ocurra después de que el estado se haya actualizado
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navegamos directamente al onboarding
      window.location.href = "/dashboard/onboarding";
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error durante el registro"
      );
      setSuccess(false);
    } finally {
      setLoading(false);
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
            setError('Error al registrar con Google');
          }
        });
      }
    }, 1000);
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
            <div className="self-stretch text-center text-[#161616] font-urbanist text-[40px] font-medium mb-[14px]">
              Crea tu cuenta
            </div>
            <div className="self-stretch text-center text-[#161616] text-[16px] font-urbanist font-normal mb-[14px]">
              Empieza a planificar tus viajes con facilidad y sin
              complicaciones.
            </div>

            {/* Estado de éxito */}
            {success && (
              <div className="w-full p-4 mb-4 bg-green-100 text-green-800 rounded-lg text-center font-urbanist">
                ¡Registro exitoso! Redirigiendo...
              </div>
            )}

            {/* Formulario */}
            <form
              onSubmit={handleRegister}
              className="flex flex-col items-center gap-[14px] self-stretch w-full"
            >
              <div className="flex flex-col items-start self-stretch">
                <div className="flex items-center w-full p-[8px] rounded-lg border-2 border-[var(--color-border)] bg-[var(--color-white)] hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary)]">
                  <div className="flex items-center gap-[8px]">
                    <div className="w-6 h-6 flex justify-center items-center">
                      <img src={UserIcon} alt="User" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nombre completo"
                      className="w-full font-urbanist text-[14px] text-[var(--color-text-secondary)] bg-transparent focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

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
                    <img
                      src={showPassword ? EyeOffIcon : EyeIcon}
                      alt="Toggle password"
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-start self-stretch">
                <div className="flex items-center w-full p-[8px] rounded-lg border-2 border-[var(--color-border)] bg-[var(--color-white)] hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary)]">
                  <div className="flex items-center gap-[8px] flex-1">
                    <div className="w-6 h-6 flex justify-center items-center">
                      <img src={PasswordIcon} alt="Password" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmar contraseña"
                      className="w-full font-urbanist text-[14px] text-[var(--color-text-secondary)] bg-transparent focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="flex justify-center items-center w-7 h-6"
                  >
                    <img
                      src={showConfirmPassword ? EyeOffIcon : EyeIcon}
                      alt="Toggle password"
                    />
                  </button>
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-col gap-[14px] w-full">
                <button
                  type="submit"
                  disabled={loading || success}
                  className="btn-dark"
                >
                  {loading
                    ? "Registrando..."
                    : success
                    ? "¡Registro exitoso!"
                    : "Registrarte"}
                </button>

                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  className="btn-secondary"
                >
                  <img src={GoogleIcon} alt="Google" className="w-4 h-4" />
                  <span>Registrarte con Google</span>
                </button>

                {/* Separador */}
                <div className="flex justify-center items-center gap-[4px] w-[215px] mx-auto">
                  <div className="flex-1 h-[1px] bg-[#ECE8F4]" />
                  <span className="text-[#828282] text-[14px] font-urbanist px-[4px]">
                    ¿Ya tienes cuenta?
                  </span>
                  <div className="flex-1 h-[1px] bg-[#ECE8F4]" />
                </div>

                {/* Botón Ingresar */}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="btn-primary"
                >
                  Ingresar
                </button>
              </div>
            </form>

            {error && (
              <p className="mt-4 text-red-500 text-center text-sm font-urbanist">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;