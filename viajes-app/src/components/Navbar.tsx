// src/components/Navbar.tsx
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from 'react-router-dom'
import logoSmall from '../assets/logo_small.svg'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  const navItems = [
    {
      name: "Inicio",
      link: "/",
    },
    {
      name: "Cómo Funciona",
      link: "/como-funciona",
    },
    {
      name: "Beneficios",
      link: "/beneficios",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="floating-nav-container"
        >
          <div className="floating-nav-content">
            <div className="floating-nav-inner">
              {/* Logo */}
              <div className="logo-container">
                <img src={logoSmall} alt="zentrip logo" className="logo" />
              </div>

              {/* Navigation Links */}
              <div className="nav-links">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="nav-link"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="auth-buttons">
                <Link to="/login" className="login-link">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="register-button">
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Navbar