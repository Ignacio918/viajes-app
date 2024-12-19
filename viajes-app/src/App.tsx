import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthPage, setShowAuthPage] = useState<'login' | 'register' | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLoginClick = () => setShowAuthPage('login');
  const handleRegisterClick = () => setShowAuthPage('register');
  const handleBackClick = () => setShowAuthPage(null);

  if (isLoggedIn) {
    return <Dashboard />;
  }

  if (showAuthPage) {
    return <AuthPage type={showAuthPage} onAuthSuccess={() => setIsLoggedIn(true)} onBack={handleBackClick} />;
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="navbar-fixed">
        <div className="container-spacing flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-900">Intellit</div>
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

      {/* Hero Section */}
      <header className="section-spacing bg-white hero-offset">
        <div className="container-spacing grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-heading">Planea, organiza y optimiza tu viaje</h1>
            <p className="text-subheading mb-6">
              Desde itinerarios personalizados hasta herramientas de viaje únicas, todo en un solo lugar.
            </p>
            <button className="btn-primary" onClick={handleLoginClick}>Comienza ahora</button>
          </div>

          {/* Right Image Container */}
          <div className="flex justify-center md:justify-end">
            <div className="mockup-box w-full md:w-2/3 lg:w-1/3 xl:w-1/4">Aquí va tu imagen</div>
          </div>
        </div>
      </header>

      {/* How it Works Section */}
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

      {/* Benefits Section */}
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

      {/* Mockups Section */}
      <section className="section-spacing">
        <div className="container-spacing text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Descubre nuestra plataforma</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="mockup-box">Mockup 1</div>
            <div className="mockup-box">Mockup 2</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container-spacing text-center">
          <p>&copy; 2024 My Travel App. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;