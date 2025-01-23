import type React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { supabase } from "./supabaseClient";
import { ThemeProvider } from "./context/ThemeContext";
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

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const AppContent = () => {
    const location = useLocation();
    const hideNavbar =
      location.pathname.startsWith("/dashboard") ||
      location.pathname === "/login" ||
      location.pathname === "/register";

    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        {!hideNavbar && <Navbar />}
        <Routes>
          {/* Rutas de autenticación sin Navbar ni Footer */}
          <Route
            path="/login"
            element={
              <div className="min-h-screen">
                <LoginPage
                  onAuthSuccess={handleAuthSuccess}
                  handleRegisterClick={() => {}}
                />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="min-h-screen">
                <RegisterPage onAuthSuccess={handleAuthSuccess} />
              </div>
            }
          />
          <Route path="/reset-password" element={<PasswordResetForm />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />

          {/* Rutas del dashboard */}
          <Route
            path="/dashboard/*"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />

          {/* Rutas con Navbar y Footer */}
          <Route
            path="/"
            element={
              <>
                <div className="flex-grow">
                  <HeroSection />
                  <HowItWorks />
                  <Benefits />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <>
                  <div className="flex-grow">
                    <UserProfile />
                  </div>
                  <Footer />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <>
                <div className="flex-grow">
                  <PrivacyPolicy />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/terms-of-service"
            element={
              <>
                <div className="flex-grow">
                  <TermsOfService />
                </div>
                <Footer />
              </>
            }
          />
          <Route path="/logout" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    );
  };

  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
