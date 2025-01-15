import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { ThemeProvider } from './context/ThemeContext'; // Importamos ThemeProvider
import Dashboard from "./pages/Dashboard";
import PasswordResetForm from "./pages/PasswordResetForm";
import SetNewPassword from "./pages/SetNewPassword";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfile from "./pages/UserProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import HeroSection from "./pages/HeroSection";
import Benefits from "./pages/Benefits";
import HowItWorks from "./pages/HowItWorks";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAuthPage, setShowAuthPage] = useState<"login" | "register" | null>(
    null
  );

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleRegisterClick = () => {
    setShowAuthPage("register");
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthPage(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider> {/* Envolvemos toda la aplicación con ThemeProvider */}
      <Router>
        <div className={`min-h-screen flex flex-col ${showAuthPage ? "bg-white dark:bg-dark" : "bg-gray-50 dark:bg-gray-900"}`}>
          {!showAuthPage && <Navbar />}
          
          <div className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {showAuthPage === null ? (
                      <div className="flex-grow">
                        <HeroSection />
                        <HowItWorks />
                        <Benefits />
                      </div>
                    ) : showAuthPage === "login" ? (
                      <LoginPage
                        onAuthSuccess={handleAuthSuccess}
                        handleRegisterClick={handleRegisterClick}
                      />
                    ) : (
                      <RegisterPage onAuthSuccess={handleAuthSuccess} />
                    )}
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <LoginPage
                    onAuthSuccess={handleAuthSuccess}
                    handleRegisterClick={handleRegisterClick}
                  />
                }
              />
              <Route
                path="/registerform"
                element={<RegisterPage onAuthSuccess={handleAuthSuccess} />}
              />
              <Route
                path="/dashboard"
                element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile"
                element={isLoggedIn ? <UserProfile /> : <Navigate to="/login" />}
              />
              <Route path="/reset-password" element={<PasswordResetForm />} />
              <Route path="/set-new-password" element={<SetNewPassword />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </div>

          {!showAuthPage && <Footer />}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;