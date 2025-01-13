// src/pages/HowItWorks.tsx
import React from 'react';
import '../styles/HowItWorks.css'; // Importa los estilos

const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works-container">
      <div className="how-it-works-content">
        <div className="frame6">
          <div className="badge">
            <span className="text">Como funciona</span>
          </div>
          <h2 className="title">Gestiona tu viaje desde un solo lugar</h2>
          <div className="steps">
            <div className="step">
              <div className="icon-wrapper">
                <div className="icon-user">
                  <div className="user">
                    <div className="vector vector1"></div>
                    <div className="vector vector2"></div>
                  </div>
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-title">Registrate y Crea tu Cuenta</h3>
                <p className="step-description">Accede a zentrip y empieza a planificar tu próxima aventura fácilmente.</p>
              </div>
            </div>
            <div className="step">
              <div className="icon-wrapper">
                <div className="icon-sparkle">
                  <div className="vector vector3"></div>
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-title">Accede a Herramientas Inteligentes</h3>
                <p className="step-description">Desde itinerarios creados con IA hasta recordatorios y gestión de gastos.</p>
              </div>
            </div>
            <div className="step">
              <div className="icon-wrapper">
                <div className="icon-routing">
                  <div className="vector vector4"></div>
                  <div className="vector vector5"></div>
                  <div className="vector vector6"></div>
                  <div className="vector vector7"></div>
                  <div className="vector vector8"></div>
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-title">Personaliza tu Experiencia</h3>
                <p className="step-description">Añade tus destinos, actividades y preferencias para un viaje a tu medida</p>
              </div>
            </div>
            <div className="step">
              <div className="icon-wrapper">
                <div className="icon-suitcase-rolling">
                  <div className="vector vector9"></div>
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-title">Disfruta de un Viaje sin Complicaciones</h3>
                <p className="step-description">Consulta tus planes, documentos y recomendaciones siempre que los necesites.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="how-it-works-image">
        <div className="pattern-light">
          <div className="radial"></div>
          <img
            className="foto-random3"
            src="https://via.placeholder.com/537x768"
            alt="Random"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;