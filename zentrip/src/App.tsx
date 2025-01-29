import type React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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
import Footer from "./pages/Footer";
import Landing from "./pages/Landing";
import 'leaflet/dist/leaflet.css';

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
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Routes>
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
          <Route 
            path="/reset-password" 
            element={<PasswordResetForm />} 
          />
          <Route 
            path="/set-new-password" 
            element={<SetNewPassword />} 
          />
          <Route
            path="/dashboard/*"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={
              <>
                <Landing />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <>
                  <UserProfile />
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
                <PrivacyPolicy />
                <Footer />
              </>
            }
          />
          <Route
            path="/terms-of-service"
            element={
              <>
                <TermsOfService />
                <Footer />
              </>
            }
          />
          <Route 
            path="/logout" 
            element={<Navigate to="/" replace />} 
          />
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