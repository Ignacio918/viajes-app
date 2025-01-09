// HeroSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/HeroSection.css';
// Imágenes de lugares
import bigBen from '../assets/imagen_bigben.png';
import coliseo from '../assets/imagen_coliseo.png';
import torreEiffel from '../assets/imagen_torreeiffel.png';
// Ilustraciones
import avion1 from '../assets/ilustracion_avion_1.svg';
import avion2 from '../assets/ilustracion_avion_2.svg';
import avion3 from '../assets/ilustracion_avion_3.svg';
import mapa from '../assets/ilustracion_mapa.svg';
// Iconos
import sendIcon from '../assets/send.svg';
import addUserIcon from '../assets/add-user-2.svg';
import locationIcon from '../assets/icon_location.svg';

const HeroSection: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero__content">
        {/* Left Section - Text Content */}
        <motion.div 
          className="hero__text-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="hero__title-dark">Descubre la manera </span>
            <span className="hero__title-accent">más fácil de planificar</span>
            <br />
            <span className="hero__title-dark">tu próxima aventura</span>
          </motion.h1>
          
          <motion.div 
            className="hero__description-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="hero__description">
              Con zentrip, tienes todo lo necesario para transformar tus viajes en momentos únicos.
            </p>
            <motion.button 
              className="hero__button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              className="hero__shape-1-inner"
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
              className="hero__shape-2-inner"
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
              className="hero__shape-3-inner"
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
              className="hero__avion-2-image"
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
              className="hero__icon"
            />
          </motion.div>

          {/* Destination Images */}
          <motion.div 
            className="hero__image-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotate: [-2, 2, -2],
              x: [-3, 3, -3]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.3 },
              rotate: { 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              },
              x: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            whileHover={{ scale: 1.05 }}
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
            animate={{ 
              opacity: 1, 
              y: 0,
              rotate: [2, -2, 2],
              x: [3, -3, 3]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.5 },
              rotate: { 
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              },
              x: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            whileHover={{ scale: 1.05 }}
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
            animate={{ 
              opacity: 1, 
              y: 0,
              rotate: [-1.5, 1.5, -1.5],
              x: [-2, 2, -2]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.7 },
              rotate: { 
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut"
              },
              x: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            whileHover={{ scale: 1.05 }}
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
              className="hero__float-icon"
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
              className="hero__float-icon"
            />
          </motion.div>

          {/* Bottom Badge with enhanced animation */}
          <motion.div 
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: [1, 1.02, 1],
              rotate: [-1, 1, -1]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.9 },
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotate: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
            }}
          >
            <motion.div 
              className="hero__badge-icon"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <img 
                src={locationIcon}
                alt="Location icon"
                className="hero__badge-icon-inner"
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