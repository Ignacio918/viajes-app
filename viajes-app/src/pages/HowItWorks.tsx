// src/pages/HowItWorks.tsx
import fotoRandom3 from '../assets/photos/foto_random3.png';
import iconUser from '../assets/icons/icon-user.svg';
import iconSparkle from '../assets/icons/icon-Sparkle.svg';
import iconRouting from '../assets/icons/icon-routing.svg';
import iconSuitcaseRolling from '../assets/icons/icon-SuitcaseRolling.svg';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  return (
    <div className="how-it-works-section">
        <img
          src={fotoRandom3}
          alt="Random travel"
          className="foto-random3"
        />

        <div className="content-container">
          <div className="badge">
            <div className="badge-text">Como funciona</div>
          </div>
          
          <div className="main-title">
            Gestiona tu viaje desde un solo lugar
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon-container">
                <div className="icon-wrapper">
                  <img src={iconUser} alt="User icon" className="icon" />
                </div>
              </div>
              <div className="feature-content">
                <div className="feature-title">
                  Registrate y Crea tu Cuenta
                </div>
                <div className="feature-description">
                  Accede a zentrip y empieza a planificar tu próxima aventura fácilmente.
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon-container">
                <div className="icon-wrapper">
                  <img src={iconSparkle} alt="Sparkle icon" className="icon" />
                </div>
              </div>
              <div className="feature-content">
                <div className="feature-title">
                  Accede a Herramientas Inteligentes
                </div>
                <div className="feature-description">
                  Desde itinerarios creados con IA hasta recordatorios y gestión de gastos.
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon-container">
                <div className="icon-wrapper">
                  <img src={iconRouting} alt="Routing icon" className="icon" />
                </div>
              </div>
              <div className="feature-content">
                <div className="feature-title">
                  Personaliza tu Experiencia
                </div>
                <div className="feature-description">
                  Añade tus destinos, actividades y preferencias para un viaje a tu medida
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon-container">
                <div className="icon-wrapper">
                  <img src={iconSuitcaseRolling} alt="Suitcase icon" className="icon" />
                </div>
              </div>
              <div className="feature-content">
                <div className="feature-title">
                  Disfruta de un Viaje sin Complicaciones
                </div>
                <div className="feature-description">
                  Consulta tus planes, documentos y recomendaciones siempre que los necesites.
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default HowItWorks;