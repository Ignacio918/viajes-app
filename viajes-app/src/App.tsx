import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Dashboard from "./pages/Dashboard";
import PasswordResetForm from "./pages/PasswordResetForm";
import SetNewPassword from "./pages/SetNewPassword";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfile from "./pages/UserProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/HeroSection";
import Benefits from "./pages/Benefits";

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
    <Router>
      <div
        className={`min-h-screen ${showAuthPage ? "bg-white" : "bg-gray-50"}`}
      >
        <div className="flex-grow main-content">
          {!showAuthPage && <Navbar />}

          <Routes>
            <Route
              path="/"
              element={
                <>
                  {showAuthPage === null ? (
                    <div className="flex-grow">
                      <HeroSection />
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
      </div>
    </Router>
  );
};

export default App;