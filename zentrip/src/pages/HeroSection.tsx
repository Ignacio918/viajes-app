import React from 'react';
import { motion } from 'framer-motion';
import '../styles/HeroSection.css';
import { useTheme } from '../context/ThemeContext'; // Importamos useTheme

// Imágenes de lugares
import bigBen from '../assets/photos/imagen_bigben.png';
import coliseo from '../assets/photos/imagen_coliseo.png';
import torreEiffel from '../assets/photos/imagen_torreeiffel.png';
// Ilustraciones
import avion1 from '../assets/illustrations/ilustracion_avion_1.svg';
import avion2 from '../assets/illustrations/ilustracion_avion_2.svg';
import avion3 from '../assets/illustrations/ilustracion_avion_3.svg';
import mapa from '../assets/illustrations/ilustracion_mapa.svg';
// Iconos
import sendIcon from '../assets/icons/send.svg';
import addUserIcon from '../assets/icons/add-user-2.svg';
import locationIcon from '../assets/icons/icon_location.svg';

const ease = [0.16, 1, 0.3, 1];

const HeroSection: React.FC = () => {
  const { isDarkMode } = useTheme(); // Usamos el hook de tema

  return (
    <div className={`hero ${isDarkMode ? 'dark' : ''}`}>
      <div className="hero__content">
        {/* Left Section - Text Content */}
        <motion.div 
          className="hero__text-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <h1 className="hero__title !text-left !text-[64px] leading-tight">
            <span className="dark:text-white text-gray-900 font-bold">Descubre la manera </span>
            <span className="text-pink-600 font-bold">más fácil de planificar </span>
            <span className="dark:text-white text-gray-900 font-bold">tu próxima aventura</span>
          </h1>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
          >
            Con zentrip, tienes todo lo necesario para transformar tus viajes en momentos únicos.
          </motion.p>

          <motion.div
            className="hero__button-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
          >
            <motion.button 
              className="hero__button"
              whileHover={{ opacity: 0.9 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="hero__button-text">
                Comenzar a planificar mi viaje
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Section - Images */}
        <div className="hero__image-section">
          {/* Background Shapes with Illustrations */}
          <motion.div 
            className="hero__shape-1"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src={avion3}
              alt="Ilustración avión 3"
              className={`hero__shape-1-inner ${isDarkMode ? 'dark:filter dark:invert' : ''}`}
            />
          </motion.div>
          
          <motion.div 
            className="hero__shape-2"
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src={avion1}
              alt="Ilustración avión 1"
              className={`hero__shape-2-inner ${isDarkMode ? 'dark:filter dark:invert' : ''}`}
            />
          </motion.div>

          <motion.div 
            className="hero__shape-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={mapa}
              alt="Ilustración mapa"
              className={`hero__shape-3-inner ${isDarkMode ? 'dark:filter dark:invert' : ''}`}
            />
          </motion.div>

          {/* Avión 2 */}
          <motion.div 
            className="hero__avion-2"
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src={avion2}
              alt="Ilustración avión 2 principal"
              className={`hero__avion-2-image ${isDarkMode ? 'dark:filter dark:invert' : ''}`}
            />
          </motion.div>

          {/* Location Icon near the map */}
          <motion.div 
            className="hero__location-icon"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src={locationIcon} 
              alt="Location icon"
              className={`hero__icon ${isDarkMode ? 'dark:filter dark:invert' : ''}`}
            />
          </motion.div>

          {/* Destination Images */}
          <motion.div 
            className="hero__image-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <img 
              src={bigBen}
              alt="Big Ben"
              className="hero__image"
            />
          </motion.div>

          <motion.div 
            className="hero__image-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <img 
              src={coliseo}
              alt="Coliseo"
              className="hero__image"
            />
          </motion.div>

          <motion.div 
            className="hero__image-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <img 
              src={torreEiffel}
              alt="Torre Eiffel"
              className="hero__image hero__image--tall"
            />
          </motion.div>

          {/* Floating Elements */}
          <motion.div 
            className="hero__float hero__float-1"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.1 }}
          >
            <img 
              src={sendIcon}
              alt="Send icon"
              className={`hero__float-icon ${isDarkMode ? 'dark:filter dark:invert' : ''}`}
            />
          </motion.div>

          <motion.div 
            className="hero__float hero__float-2"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            whileHover={{ scale: 1.1 }}
          >
            <img 
              src={addUserIcon}
              alt="Add user icon"
              className={`hero__float-icon ${isDarkMode ? 'dark:filter dark:invert' : ''}`}
            />
          </motion.div>

          {/* Bottom Badge */}
          <motion.div 
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.9,
              ease
            }}
            whileHover={{ 
              y: -2,
              backgroundColor: isDarkMode ? "rgb(31, 41, 55)" : "rgb(249, 250, 251)",
              transition: { 
                duration: 0.3,
                ease 
              }
            }}
          >
            <motion.div 
              className="hero__badge-icon"
              whileHover={{
                color: "rgb(219, 39, 119)"
              }}
            >
              <img 
                src={locationIcon}
                alt="Location icon"
                className={`hero__badge-icon-inner ${isDarkMode ? 'dark:filter dark:invert' : ''}`}
              />
            </motion.div>
            <span className="hero__badge-text">
              Explora. Organiza. Disfruta.
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;