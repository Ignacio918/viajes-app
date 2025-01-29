import React from 'react';
import { motion } from "framer-motion";
import { useTheme } from '../context/ThemeContext';
import iconCalendar from '../assets/icons/icon-calendar.svg';
import iconDollar from '../assets/icons/icon-dollar.svg';
import iconMap from '../assets/icons/icon-map.svg';
import ilustracionAvion from '../assets/illustrations/ilustracion_avion_beneficios.svg';
import ilustracionObjects from '../assets/illustrations/ilustracion_objects.svg';
import imagenPlaya from '../assets/photos/imagen_playa.png';
import imagenCataratas from '../assets/photos/imagen_cataratas.png';
import '../styles/Benefits.css';

const Benefits = () => {
  const { isDarkMode } = useTheme();
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section className={`benefits-section ${isDarkMode ? 'dark' : ''}`}>
      <div className="PatternLight">
        {/* Ilustración Objects con animación flotante */}
        <div className="IlustracionObjects floating-animation">
          <img 
            src={ilustracionObjects} 
            alt="Pattern decorativo" 
            className="objects-image"
          />
        </div>
        
        <div className="main-content-container">
          <div className="Frame52">
            <div className="Frame22">
              <div className="Frame47">
                <div className="Frame39">
                  <div className="SectionBadge">
                    <div className="SectionBadge__text">Beneficios</div>
                  </div>
                  <h2 className="main-title">Todo lo que zentrip puede hacer por ti</h2>
                </div>
                <p className="subtitle">Descubre las herramientas diseñadas para hacer de tu experiencia de viaje algo único e inolvidable:</p>
              </div>
            </div>
            <div className="Frame44">
              {[
                {
                  icon: iconCalendar,
                  title: "Planificación Inteligente de Itinerarios",
                  description: "Diseña cada día de tu viaje con actividades, atracciones y tiempos libres adaptados a tus necesidades."
                },
                {
                  icon: iconMap,
                  title: "Mapas Interactivos Personalizados",
                  description: "Explora destinos, restaurantes y lugares únicos con mapas intuitivos diseñados para ti."
                },
                {
                  icon: iconDollar,
                  title: "Gestión de Presupuesto Simplificada",
                  description: "Lleva el control de tus gastos en tiempo real para viajar sin preocupaciones."
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className="benefit-card"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.2
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="icon-container">
                    <div className="icon-circle">
                      <img src={card.icon} alt={card.title} className="icon" />
                    </div>
                  </div>
                  <div className="card-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="Frame139">
            <motion.div 
              className="Frame138"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img src={imagenCataratas} alt="Cataratas" className="imagen-cataratas" />
            </motion.div>
            <motion.div 
              className="Frame137"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="imagen-playa-container">
                <img src={imagenPlaya} alt="Playa" className="imagen-playa" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="IlustracionAvionBeneficios floating-animation-reverse">
          <img 
            src={ilustracionAvion} 
            alt="Avión decorativo" 
            className="avion-image"
          />
        </div>

        <div className="text-container">
          <motion.p 
            className="bottom-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            ...y muchas más funciones creadas para que disfrutes al máximo cada aventura.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;