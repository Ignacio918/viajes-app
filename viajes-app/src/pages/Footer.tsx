// src/pages/Footer.tsx
import { FC, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Send, Moon, Sun } from 'lucide-react';
import logo_small from '../assets/logo_small.svg';
import '../styles/Footer.css';
import { useTheme } from '../context/ThemeContext';

const Footer: FC = () => {
  const [email, setEmail] = useState('');
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email subscrito:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Newsletter Section */}
          <div className="footer__section">
            <div className="footer__logo">
              <img src={logo_small} alt="zentrip logo" />
            </div>
            <h2 className="footer__title">Mantente Conectado</h2>
            <p className="footer__description">
              Únete a nuestro newsletter para recibir las últimas actualizaciones y ofertas exclusivas.
            </p>
            <form className="footer__form" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email"
                className="footer__input"
                required
              />
              <button type="submit" className="footer__submit">
                <Send className="footer__submit-icon" />
                <span className="sr-only">Suscribirse</span>
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h3 className="footer__subtitle">Enlaces Rápidos</h3>
            <nav className="footer__nav">
              <Link to="/" className="footer__link">Inicio</Link>
              <Link to="/como-funciona" className="footer__link">Cómo Funciona</Link>
              <Link to="/beneficios" className="footer__link">Beneficios</Link>
              <Link to="/contacto" className="footer__link">Contacto</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footer__section">
            <h3 className="footer__subtitle">Contáctanos</h3>
            <address className="footer__address">
              <p>Argentina</p>
              <p>Buenos Aires</p>
              <p>Email: info@zentrip.com</p>
            </address>
            
            {/* Theme Switch */}
            <div className="footer__theme-switch">
              <button
                onClick={toggleDarkMode}
                className="footer__theme-button group"
                aria-label="Cambiar tema"
              >
                {isDarkMode ? (
                  <Sun className="footer__theme-icon text-yellow-400" />
                ) : (
                  <Moon className="footer__theme-icon text-gray-600" />
                )}
                <span className="footer__theme-text">
                  {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
                </span>
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div className="footer__section">
            <h3 className="footer__subtitle">Síguenos</h3>
            <div className="footer__social">
              <a href="#" className="footer__social-button">
                <Facebook className="footer__social-icon" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="footer__social-button">
                <Twitter className="footer__social-icon" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="footer__social-button">
                <Instagram className="footer__social-icon" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="footer__social-button">
                <Linkedin className="footer__social-icon" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2024 Zentrip. Todos los derechos reservados.
          </p>
          <nav className="footer__bottom-nav">
            <Link to="/privacidad" className="footer__bottom-link">Política de Privacidad</Link>
            <Link to="/terminos" className="footer__bottom-link">Términos de Servicio</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;