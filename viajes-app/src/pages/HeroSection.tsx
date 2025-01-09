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

const ease = [0.16, 1, 0.3, 1];

const HeroSection: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero__content">
        {/* Left Section - Text Content with new styling */}
        <div className="flex flex-col gap-4 w-full lg:max-w-2xl">
          <motion.div 
            className="hero__text-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease }}
            >
              <span className="text-foreground">Descubre la manera </span>
              <span className="text-primary">más fácil de planificar</span>
              <br />
              <span className="text-foreground">tu próxima aventura</span>
            </motion.h1>

            <motion.p
              className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease }}
            >
              Con zentrip, tienes todo lo necesario para transformar tus viajes en momentos únicos.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease }}
            >
              <motion.button 
                className="hero__button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hero__button-text">
                  Comenzar a planificar mi viaje
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

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

          {/* Bottom Badge */}
          <motion.div 
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <div className="hero__badge-icon">
              <img 
                src={locationIcon}
                alt="Location icon"
                className="hero__badge-icon-inner"
              />
            </div>
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