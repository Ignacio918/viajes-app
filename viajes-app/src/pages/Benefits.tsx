// Benefits.tsx (sin cambios en el componente)
import iconCalendar from '../assets/icons/icon-calendar.svg';
import iconDollar from '../assets/icons/icon-dollar.svg';
import iconMap from '../assets/icons/icon-map.svg';
import ilustracionAvion from '../assets/illustrations/ilustracion_avion_beneficios.svg';
import ilustracionObjects from '../assets/illustrations/ilustracion_objects.svg';
import imagenPlaya from '../assets/photos/imagen_playa.png';
import imagenCataratas from '../assets/photos/imagen_cataratas.png';
import '../styles/Benefits.css';

const Benefits = () => {
  return (
    <section className="benefits-section">
      <div className="PatternLight">
        {/* Ilustración Objects */}
        <div className="IlustracionObjects">
          <img 
            src={ilustracionObjects} 
            alt="Pattern decorativo" 
            className="objects-image"
          />
        </div>
        
        {/* Contenedor principal */}
        <div className="main-content-container">
          {/* Frame 52 - Contenido izquierdo */}
          <div className="Frame52">
            <div className="Frame22">
              <div className="Frame47">
                <div className="Frame39">
                  <div className="BadgeBenefits">
                    <div className="Text">Beneficios</div>
                  </div>
                  <h2 className="main-title">Todo lo que zentrip puede hacer por ti</h2>
                </div>
                <p className="subtitle">Descubre las herramientas diseñadas para hacer de tu experiencia de viaje algo único e inolvidable:</p>
              </div>
            </div>
            <div className="Frame44">
              {/* Cards */}
              <div className="benefit-card">
                <div className="icon-container">
                  <div className="icon-circle">
                    <img src={iconCalendar} alt="Calendario" className="icon" />
                  </div>
                </div>
                <div className="card-content">
                  <h3>Planificación Inteligente de Itinerarios</h3>
                  <p>Diseña cada día de tu viaje con actividades, atracciones y tiempos libres adaptados a tus necesidades.</p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="icon-container">
                  <div className="icon-circle">
                    <img src={iconMap} alt="Mapa" className="icon" />
                  </div>
                </div>
                <div className="card-content">
                  <h3>Mapas Interactivos Personalizados</h3>
                  <p>Explora destinos, restaurantes y lugares únicos con mapas intuitivos diseñados para ti.</p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="icon-container">
                  <div className="icon-circle">
                    <img src={iconDollar} alt="Dólar" className="icon" />
                  </div>
                </div>
                <div className="card-content">
                  <h3>Gestión de Presupuesto Simplificada</h3>
                  <p>Lleva el control de tus gastos en tiempo real para viajar sin preocupaciones.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Frame 139 - Imágenes derecha */}
          <div className="Frame139">
            <div className="Frame138">
              <div className="imagen-cataratas-container">
                <img src={imagenCataratas} alt="Cataratas" className="imagen-cataratas" />
              </div>
            </div>
            <div className="Frame137">
              <div className="imagen-playa-container">
                <img src={imagenPlaya} alt="Playa" className="imagen-playa" />
              </div>
            </div>
          </div>
        </div>

        {/* Ilustración Avión */}
        <div className="IlustracionAvionBeneficios">
          <img 
            src={ilustracionAvion} 
            alt="Avión decorativo" 
            className="avion-image"
          />
        </div>

        {/* Texto final */}
        <p className="bottom-text">
          ...y muchas más funciones creadas para que disfrutes al máximo cada aventura.
        </p>
      </div>
    </section>
  );
};

export default Benefits;