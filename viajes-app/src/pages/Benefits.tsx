// pages/Benefits.tsx
import iconCalendar from '../assets/icons/icon-calendar.svg';
import iconDollar from '../assets/icons/icon-dollar.svg';
import iconMap from '../assets/icons/icon-map.svg';
import ilustracionAvion from '../assets/ilustraciones/illustracion_avion_beneficios.svg';
import ilustracionObjects from '../assets/ilustraciones/ilustracion_objects.svg';
import imagenPlaya from '../assets/photos/imagen_playa.png';
import imagenCataratas from '../assets/photos/imagen_cataratas.png';
import '../styles/Benefits.css';

const Benefits = () => {
  return (
    <section className="benefits-section">
      <div className="pattern-light">
        <div className="radial-background">
          {/* Vector rosa (ilustración objects) */}
          <div className="vector-container">
            <img 
              src={ilustracionObjects} 
              alt="Decorative vectors" 
              className="vector-image"
            />
          </div>

          {/* Ilustración del avión */}
          <div className="airplane-container">
            <img 
              src={ilustracionAvion} 
              alt="Decorative airplane" 
              className="airplane-image"
            />
          </div>

          {/* Contenedor para las imágenes y los iconos */}
          <div className="benefits-content">
            <div className="image-with-icon">
              <img src={imagenPlaya} alt="Playa" className="benefit-image" />
              <img src={iconCalendar} alt="Calendar" className="benefit-icon" />
            </div>

            <div className="center-icon">
              <img src={iconDollar} alt="Dollar" className="solo-icon" />
            </div>

            <div className="image-with-icon">
              <img src={imagenCataratas} alt="Cataratas" className="benefit-image" />
              <img src={iconMap} alt="Map" className="benefit-icon" />
            </div>
          </div>

          {/* Texto final */}
          <p className="benefits-text">
            ...y muchas más funciones creadas para que disfrutes al máximo cada aventura.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;