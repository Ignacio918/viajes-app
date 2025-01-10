// pages/Benefits.tsx
import iconCalendar from '../assets/icons/icon-calendar.svg';
import iconDollar from '../assets/icons/icon-dollar.svg';
import iconMap from '../assets/icons/icon-map.svg';
import ilustracionAvion from '../assets/illustrations/illustracion_avion_beneficios.svg';
import ilustracionObjects from '../assets/illustrations/ilustracion_objects.svg';
import imagenPlaya from '../assets/photos/imagen_playa.png';
import imagenCataratas from '../assets/photos/imagen_cataratas.png';
import '../styles/Benefits.css';

const Benefits = () => {
  return (
    <section className="benefits-section">
      {/* Fondo y patrones */}
      <div className="benefits-background" />
      
      {/* Ilustración Objects (lado izquierdo) */}
      <div className="benefits-objects">
        <img 
          src={ilustracionObjects} 
          alt="Decorative pattern"
          className="objects-image"
        />
      </div>

      {/* Ilustración Avión (esquina superior derecha) */}
      <div className="benefits-airplane">
        <img 
          src={ilustracionAvion} 
          alt="Airplane illustration"
          className="airplane-image"
        />
      </div>

      {/* Contenido principal */}
      <div className="benefits-container">
        <div className="benefits-header">
          <h2 className="benefits-title">
            Beneficios de viajar con ZenTrip
          </h2>
        </div>

        {/* Grid de beneficios */}
        <div className="benefits-grid">
          {/* Beneficio 1 con imagen de playa */}
          <div className="benefit-card">
            <div className="benefit-image-container">
              <img src={imagenPlaya} alt="Playa" className="benefit-image" />
              <img src={iconCalendar} alt="Calendar" className="benefit-icon" />
            </div>
            <h3 className="benefit-title">Planificación Inteligente</h3>
            <p className="benefit-description">Organiza tu itinerario de manera eficiente</p>
          </div>

          {/* Beneficio 2 con icono */}
          <div className="benefit-card">
            <div className="benefit-icon-container">
              <img src={iconDollar} alt="Dollar" className="benefit-center-icon" />
            </div>
            <h3 className="benefit-title">Control de Presupuesto</h3>
            <p className="benefit-description">Gestiona tus gastos de viaje fácilmente</p>
          </div>

          {/* Beneficio 3 con imagen de cataratas */}
          <div className="benefit-card">
            <div className="benefit-image-container">
              <img src={imagenCataratas} alt="Cataratas" className="benefit-image" />
              <img src={iconMap} alt="Map" className="benefit-icon" />
            </div>
            <h3 className="benefit-title">Destinos Únicos</h3>
            <p className="benefit-description">Descubre lugares increíbles</p>
          </div>
        </div>

        {/* Texto final */}
        <p className="benefits-footer">
          ...y muchas más funciones creadas para que disfrutes al máximo cada aventura.
        </p>
      </div>
    </section>
  );
};

export default Benefits;