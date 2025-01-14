// src/pages/HowItWorks.tsx
import fotoRandom3 from '../assets/photos/foto_random3.png';
import iconUser from '../assets/icons/icon-user.svg';
import iconSparkle from '../assets/icons/icon-Sparkle.svg';
import iconRouting from '../assets/icons/icon-routing.svg';
import iconSuitcaseRolling from '../assets/icons/icon-SuitcaseRolling.svg';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <div className="how-it-works__container">
        <div className="how-it-works__image-container">
          <img
            src={fotoRandom3}
            alt="Random travel"
            className="how-it-works__image"
          />
        </div>

        <div className="how-it-works__right">
          <div className="how-it-works__badge">Como funciona</div>
          
          <h2 className="how-it-works__title">
            Gestiona tu viaje desde un solo lugar
          </h2>
          
          <div className="how-it-works__features">
            <div className="how-it-works__feature">
              <div className="how-it-works__feature-icon">
                <img src={iconUser} alt="User icon" />
              </div>
              <div className="how-it-works__feature-content">
                <div className="how-it-works__feature-title">
                  Registrate y Crea tu Cuenta
                </div>
                <div className="how-it-works__feature-text">
                  Accede a zentrip y empieza a planificar tu próxima aventura fácilmente.
                </div>
              </div>
            </div>

            <div className="how-it-works__feature">
              <div className="how-it-works__feature-icon">
                <img src={iconRouting} alt="Routing icon" />
              </div>
              <div className="how-it-works__feature-content">
                <div className="how-it-works__feature-title">
                  Personaliza tu Experiencia
                </div>
                <div className="how-it-works__feature-text">
                  Añade tus destinos, actividades y preferencias para un viaje a tu medida
                </div>
              </div>
            </div>

            <div className="how-it-works__feature">
              <div className="how-it-works__feature-icon">
                <img src={iconSparkle} alt="Sparkle icon" />
              </div>
              <div className="how-it-works__feature-content">
                <div className="how-it-works__feature-title">
                  Accede a Herramientas Inteligentes
                </div>
                <div className="how-it-works__feature-text">
                  Desde itinerarios creados con IA hasta recordatorios y gestión de gastos.
                </div>
              </div>
            </div>

            <div className="how-it-works__feature">
              <div className="how-it-works__feature-icon">
                <img src={iconSuitcaseRolling} alt="Suitcase icon" />
              </div>
              <div className="how-it-works__feature-content">
                <div className="how-it-works__feature-title">
                  Disfruta de un Viaje sin Complicaciones
                </div>
                <div className="how-it-works__feature-text">
                  Consulta tus planes, documentos y recomendaciones siempre que los necesites.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;