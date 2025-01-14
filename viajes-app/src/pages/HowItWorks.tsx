import fotoRandom3 from '../assets/photos/foto_random3.png';
import iconUser from '../assets/icons/icon-user.svg';
import iconSparkle from '../assets/icons/icon-Sparkle.svg';
import iconRouting from '../assets/icons/icon-routing.svg';
import iconSuitcaseRolling from '../assets/icons/icon-SuitcaseRolling.svg';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works-section">
        <img
          src={fotoRandom3}
          alt="Random travel"
          className="foto-random3"
        />

        <div className="content-container">
          <div className="badge">Como funciona</div>
          
          <h2 className="main-title">
            Gestiona tu viaje desde un solo lugar
          </h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon-container">
                <img src={iconUser} alt="User icon" className="icon" />
              </div>
              <div className="feature-content">
                <h3>Registrate y Crea tu Cuenta</h3>
                <p>Accede a zentrip y empieza a planificar tu próxima aventura fácilmente.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon-container">
                <img src={iconSparkle} alt="Sparkle icon" className="icon" />
              </div>
              <div className="feature-content">
                <h3>Accede a Herramientas Inteligentes</h3>
                <p>Desde itinerarios creados con IA hasta recordatorios y gestión de gastos.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon-container">
                <img src={iconRouting} alt="Routing icon" className="icon" />
              </div>
              <div className="feature-content">
                <h3>Personaliza tu Experiencia</h3>
                <p>Añade tus destinos, actividades y preferencias para un viaje a tu medida</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon-container">
                <img src={iconSuitcaseRolling} alt="Suitcase icon" className="icon" />
              </div>
              <div className="feature-content">
                <h3>Disfruta de un Viaje sin Complicaciones</h3>
                <p>Consulta tus planes, documentos y recomendaciones siempre que los necesites.</p>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default HowItWorks;