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
              <div className="relative w-full">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nombre completo"
                  required
                  className="w-full h-[40px] px-4 rounded-[4px] border border-[#ECE8F4] bg-white text-[14px] font-urbanist placeholder:text-[#828282]"
                />
                <img
                  src={UserIcon}
                  alt="User"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4"
                />
              </div>

              <div className="relative w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full h-[40px] px-4 rounded-[4px] border border-[#ECE8F4] bg-white text-[14px] font-urbanist placeholder:text-[#828282]"
                />
                <img
                  src={MailIcon}
                  alt="Mail"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4"
                />
              </div>

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  required
                  className="w-full h-[40px] px-4 rounded-[4px] border border-[#ECE8F4] bg-white text-[14px] font-urbanist placeholder:text-[#828282]"
                />
                <img
                  src={PasswordIcon}
                  alt="Password"
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 w-4 h-4"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
                >
                  <img
                    src={showPassword ? EyeOffIcon : EyeIcon}
                    alt="Toggle password visibility"
                    className="w-4 h-4"
                  />
                </button>
              </div>

              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmar contraseña"
                  required
                  className="w-full h-[40px] px-4 rounded-[4px] border border-[#ECE8F4] bg-white text-[14px] font-urbanist placeholder:text-[#828282]"
                />
                <img
                  src={PasswordIcon}
                  alt="Password"
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 w-4 h-4"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
                >
                  <img
                    src={showConfirmPassword ? EyeOffIcon : EyeIcon}
                    alt="Toggle password visibility"
                    className="w-4 h-4"
                  />
                </button>
              </div>

              {/* Botones */}
              <div className="flex flex-col gap-[14px] w-full">
                <button
                  type="submit"
                  disabled={loading || success}
                  className={`
                    flex justify-center items-center gap-[10px] self-stretch p-[10px] h-[40px] 
                    rounded-full bg-[#161616] text-white text-[16px] font-urbanist 
                    transform transition-all duration-200 
                    ${!loading && !success ? "hover:scale-[1.02]" : ""} 
                    ${loading || success ? "opacity-70 cursor-not-allowed" : ""}
                  `}
                >
                  {loading
                    ? "Registrando..."
                    : success
                    ? "¡Registro exitoso!"
                    : "Registrarte"}
                </button>

                <button
                  type="button"
                  className="flex justify-center items-center gap-[10px] self-stretch p-[10px] h-[40px] rounded-full border border-[#44178C] text-[#44178C] text-[16px] font-urbanist transform transition-all duration-200 hover:scale-[1.02] hover:bg-[#ECE8F4]"
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
                  className="flex justify-center items-center gap-[10px] self-stretch p-[10px] h-[40px] rounded-full bg-[#44178C] text-white text-[16px] font-urbanist transform transition-all duration-200 hover:scale-[1.02] hover:bg-[#5B1EBB]"
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
