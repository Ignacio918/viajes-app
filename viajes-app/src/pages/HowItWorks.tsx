// src/pages/HowItWorks.tsx
import fotoRandom3 from '../assets/photos/foto_random3.png';
import iconUser from '../assets/icons/icon-user.svg';
import iconSparkle from '../assets/icons/icon-Sparkle.svg';
import iconRouting from '../assets/icons/icon-routing.svg';
import iconSuitcaseRolling from '../assets/icons/icon-SuitcaseRolling.svg';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="section">
        <img
          src={fotoRandom3}
          alt="Random travel"
          className="foto"
        />

        <div className="container">
          <div className="badge">Como funciona</div>
          
          <h2 className="title">Gestiona tu viaje desde un solo lugar</h2>
          
          <div className="features">
            <div className="feature">
              <div className="icon">
                <img src={iconUser} alt="User icon" />
              </div>
              <h3>Registrate y Crea tu Cuenta</h3>
              <p>Accede a zentrip y empieza a planificar tu próxima aventura fácilmente.</p>
            </div>

            <div className="feature">
              <div className="icon">
                <img src={iconSparkle} alt="Sparkle icon" />
              </div>
              <h3>Accede a Herramientas Inteligentes</h3>
              <p>Desde itinerarios creados con IA hasta recordatorios y gestión de gastos.</p>
            </div>

            <div className="feature">
              <div className="icon">
                <img src={iconRouting} alt="Routing icon" />
              </div>
              <h3>Personaliza tu Experiencia</h3>
              <p>Añade tus destinos, actividades y preferencias para un viaje a tu medida</p>
            </div>

            <div className="feature">
              <div className="icon">
                <img src={iconSuitcaseRolling} alt="Suitcase icon" />
              </div>
              <h3>Disfruta de un Viaje sin Complicaciones</h3>
              <p>Consulta tus planes, documentos y recomendaciones siempre que los necesites.</p>
            </div>
          </div>
        </div>
    </section>
  );
};

export default HowItWorks;