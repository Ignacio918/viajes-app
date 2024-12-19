import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import PasswordResetForm from './components/PasswordResetForm';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAuthPage, setShowAuthPage] = useState<'login' | 'register' | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLoginClick = () => {
    console.log("Login button clicked");
    setShowAuthPage('login');
  };

  const handleRegisterClick = () => {
    console.log("Register button clicked");
    setShowAuthPage('register');
  };

  const handleBackClick = () => {
    console.log("Back button clicked");
    setShowAuthPage(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="navbar-fixed">
          <div className="container-spacing flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-gray-900">Intellit</Link>
            <div className="hidden md:flex space-x-6">
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#technology" className="text-gray-600 hover:text-gray-900">Technology</a>
              <a href="#services" className="text-gray-600 hover:text-gray-900">Services</a>
              <a href="#support" className="text-gray-600 hover:text-gray-900">Support</a>
              <button className="btn-secondary" onClick={handleLoginClick}>Login</button>
              <button className="btn-primary" onClick={handleRegisterClick}>Sign Up</button>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              {showAuthPage === null ? (
                <div className="flex-grow">
                  <header className="section-spacing bg-white hero-offset">
                    <div className="container-spacing grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="text-center md:text-left">
                        <h1 className="text-heading">Planea, organiza y optimiza tu viaje</h1>
                        <p className="text-subheading mb-6">
                          Desde itinerarios personalizados hasta herramientas de viaje únicas, todo en un solo lugar.
                        </p>
                        <button className="btn-primary" onClick={handleLoginClick}>Comienza ahora</button>
                      </div>
                      <div className="flex justify-center md:justify-end">
                        <div className="mockup-box w-full md:w-2/3 lg:w-1/2 xl:w-1/3">Aquí va tu imagen</div>
                      </div>
                    </div>
                  </header>
                  <section className="section-spacing bg-gray-50">
                    <div className="container-spacing text-center">
                      <h2 className="text-3xl font-bold mb-6 text-gray-900">Cómo funciona</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-gray-700">1. Regístrate</h3>
                          <p className="text-gray-600">Regístrate y dinos tus preferencias de viaje.</p>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-gray-700">2. Genera tu itinerario</h3>
                          <p className="text-gray-600">Deja que nuestra IA cree un itinerario a tu medida.</p>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-gray-700">3. Disfruta del viaje</h3>
                          <p className="text-gray-600">Accede a todas las herramientas para tu viaje perfecto.</p>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="section-spacing bg-gray-100">
                    <div className="container-spacing text-center">
                      <h2 className="text-3xl font-bold mb-6 text-gray-900">Beneficios</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Itinerarios personalizados</h3>
                          <p className="text-gray-600">Generados automáticamente según tus gustos.</p>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Gestión de documentos</h3>
                          <p className="text-gray-600">Todos tus documentos en un solo lugar.</p>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Organización completa</h3>
                          <p className="text-gray-600">Desde presupuesto hasta actividades, todo organizado.</p>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="section-spacing">
                    <div className="container-spacing text-center">
                      <h2 className="text-3xl font-bold mb-6 text-gray-900">Descubre nuestra plataforma</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="mockup-box">Mockup 1</div>
                        <div className="mockup-box">Mockup 2</div>
                      </div>
                    </div>
                  </section>
                  <footer className="bg-gray-900 text-white py-8">
                    <div className="container-spacing text-center">
                      <p>&copy; 2024 My Travel App. Todos los derechos reservados.</p>
                    </div>
                  </footer>
                </div>
              ) : (
                <AuthPage type={showAuthPage} onAuthSuccess={() => setIsLoggedIn(true)} onBack={handleBackClick} />
              )}
            </>
          } />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/reset-password" element={<PasswordResetForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;