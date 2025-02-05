import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import GoogleIcon from "../assets/icons/devicon_google.svg";
import EyeIcon from "../assets/icons/eye.svg";
import EyeOffIcon from "../assets/icons/eye-slash.svg";
import Logo from "../assets/logo_medium.svg";
import TextField from "../components/TextField";
import "../styles/RegisterPage.css";

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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formValidation, setFormValidation] = useState<FormState>({
    fullName: { isValid: false, message: "" },
    email: { isValid: false, message: "" },
    password: { isValid: false, message: "" },
    confirmPassword: { isValid: false, message: "" },
  });

  const validateFullName = (name: string): FormValidation => {
    if (!name.trim()) {
      return { isValid: false, message: "El nombre es requerido" };
    }
    if (name.length < 3) {
      return {
        isValid: false,
        message: "El nombre debe tener al menos 3 caracteres",
      };
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
      return {
        isValid: false,
        message: "El nombre solo puede contener letras",
      };
    }
    return { isValid: true, message: "Nombre válido" };
  };

  const validateEmail = (email: string): FormValidation => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return { isValid: false, message: "El email es requerido" };
    }
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Email inválido" };
    }
    return { isValid: true, message: "Email válido" };
  };

  const validatePassword = (pass: string): FormValidation => {
    if (!pass) {
      return { isValid: false, message: "La contraseña es requerida" };
    }
    if (pass.length < 8) {
      return { isValid: false, message: "Mínimo 8 caracteres" };
    }
    if (!/[A-Z]/.test(pass)) {
      return { isValid: false, message: "Debe incluir al menos una mayúscula" };
    }
    if (!/[0-9]/.test(pass)) {
      return { isValid: false, message: "Debe incluir al menos un número" };
    }
    if (!/[!@#$%^&*]/.test(pass)) {
      return {
        isValid: false,
        message: "Debe incluir al menos un carácter especial (!@#$%^&*)",
      };
    }
    return { isValid: true, message: "Contraseña válida" };
  };

  const validateConfirmPassword = (confirm: string): FormValidation => {
    if (!confirm) {
      return { isValid: false, message: "Debe confirmar la contraseña" };
    }
    if (confirm !== password) {
      return { isValid: false, message: "Las contraseñas no coinciden" };
    }
    return { isValid: true, message: "Las contraseñas coinciden" };
  };

  useEffect(() => {
    setFormValidation({
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword),
    });
  }, [fullName, email, password, confirmPassword]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const allValidations = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword),
    };

    setFormValidation(allValidations);

    if (!Object.values(allValidations).every((v) => v.isValid)) {
      setError("Por favor, corrige los errores en el formulario");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        onAuthSuccess();
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Ocurrió un error al intentar registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError("");

    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    let authListener: any = null;
    let popupClosed = false;

    // Configuramos el listener de autenticación antes de abrir el popup
    authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        onAuthSuccess();
        navigate("/dashboard");
        if (authListener) authListener.unsubscribe();
      }
    });

    const popup = window.open(
      `https://szloqueilztpbdurfowm.supabase.co/auth/v1/authorize?provider=google&redirect_to=https://zentrip.vercel.app/dashboard`,
      "GoogleSignIn",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    if (!popup) {
      setError("No se pudo abrir el popup para la autenticación de Google.");
      setIsLoading(false);
      if (authListener) authListener.unsubscribe();
      return;
    }

    const interval = setInterval(async () => {
      if (popup.closed && !popupClosed) {
        popupClosed = true;
        clearInterval(interval);

        try {
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession();

          if (sessionError) throw sessionError;

          if (!session?.user?.id) {
            setError("No se completó el inicio de sesión con Google");
            if (authListener) authListener.unsubscribe();
          }
        } catch (error) {
          console.error("Error al verificar sesión:", error);
          setError("Error al verificar la sesión");
          if (authListener) authListener.unsubscribe();
        }

        setIsLoading(false);
      }
    }, 1000);

    // Limpieza al desmontar
    return () => {
      clearInterval(interval);
      if (authListener) authListener.unsubscribe();
    };
  };

  return (
    <div className="register-page-container">
      <div className="register-form-container">
        <div className="auth-logo-container">
          <img src={Logo} alt="Zentrip Logo" className="auth-logo-image" />
        </div>
        <h2 className="auth-title">Crea tu cuenta gratis</h2>
        <p className="auth-description">
          Transforma tus ideas en aventuras reales
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-inputs-container">
            <LabelInputContainer>
              <TextField
                label="Nombre completo"
                placeholder="Ingresa tu nombre completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                state={
                  formValidation.fullName.isValid
                    ? "success"
                    : fullName
                    ? "error"
                    : "enabled"
                }
                type="text"
                disabled={isLoading}
                helperText={fullName ? formValidation.fullName.message : ""}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <TextField
                label="Email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                state={
                  formValidation.email.isValid
                    ? "success"
                    : email
                    ? "error"
                    : "enabled"
                }
                type="email"
                disabled={isLoading}
                helperText={email ? formValidation.email.message : ""}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <TextField
                label="Contraseña"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                state={
                  formValidation.password.isValid
                    ? "success"
                    : password
                    ? "error"
                    : "enabled"
                }
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                helperText={password ? formValidation.password.message : ""}
                icon={
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    <img
                      src={showPassword ? EyeOffIcon : EyeIcon}
                      alt="Toggle password"
                    />
                  </button>
                }
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <TextField
                label="Confirmar contraseña"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                state={
                  formValidation.confirmPassword.isValid
                    ? "success"
                    : confirmPassword
                    ? "error"
                    : "enabled"
                }
                type={showConfirmPassword ? "text" : "password"}
                disabled={isLoading}
                helperText={
                  confirmPassword ? formValidation.confirmPassword.message : ""
                }
                icon={
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    <img
                      src={showConfirmPassword ? EyeOffIcon : EyeIcon}
                      alt="Toggle password"
                    />
                  </button>
                }
              />
            </LabelInputContainer>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Registrando...</span>
              </>
            ) : (
              "Regístrate"
            )}
          </button>

          <div className="auth-divider" />

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="auth-google-button"
            disabled={isLoading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Conectando...
              </>
            ) : (
              <>
                <img
                  src={GoogleIcon}
                  alt="Google"
                  className="google-icon"
                  style={{ marginRight: "8px" }}
                />
                Registrarse con Google
              </>
            )}
          </button>

          <div className="auth-login-link">
            <span className="auth-text">¿Ya tienes una cuenta?</span>
            <span
              className="auth-link"
              onClick={() => navigate("/login")}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === "Enter" && navigate("/login")}
            >
              Inicia sesión
            </span>
          </div>
        </form>

        {error && <p className="auth-error">{error}</p>}
      </div>
    </div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`label-input-container ${className || ""}`}>{children}</div>
  );
};

export default RegisterPage;