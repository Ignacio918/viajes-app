import React from 'react';
import './HeroSection.css';
import ilustracion1 from '../assets/ilustracion_mapa_aviones1.svg';
import ilustracion2 from '../assets/ilustracion_mapa_aviones2.svg';
import sendIcon from '../assets/send.svg';
import addUserIcon from '../assets/add-user-2.svg';

const HeroSection: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero__content">
        {/* Left Section - Text Content */}
        <div className="hero__text-section">
          <h1 className="hero__title">
            <span className="hero__title-dark">Descubre la manera </span>
            <span className="hero__title-accent">más fácil de planificar</span>
            <br />
            <span className="hero__title-dark">tu próxima aventura</span>
          </h1>
          
          <div className="hero__description-container">
            <p className="hero__description">
              Con zentrip, tienes todo lo necesario para transformar tus viajes en momentos únicos.
            </p>
            <button className="hero__button">
              <span className="hero__button-text">
                Comenzar a planificar mi viaje
              </span>
            </button>
          </div>
        </div>

        {/* Right Section - Images */}
        <div className="hero__image-section">
          {/* Background Shapes */}
          <div className="hero__shape-1">
            <div className="hero__shape-1-inner"></div>
          </div>
          <div className="hero__shape-2">
            <div className="hero__shape-2-inner"></div>
          </div>
          <div className="hero__shape-3"></div>

          {/* Images */}
          <div className="hero__image-1">
            <img 
              src={ilustracion1}
              alt="Mapa y aviones ilustración 1"
              className="hero__image"
            />
          </div>
          <div className="hero__image-2">
            <img 
              src={ilustracion2}
              alt="Mapa y aviones ilustración 2"
              className="hero__image"
            />
          </div>
          <div className="hero__image-3">
            <img 
              src={ilustracion1}
              alt="Mapa y aviones ilustración 3"
              className="hero__image"
            />
          </div>

          {/* Floating Elements */}
          <div className="hero__float hero__float-1">
            <img 
              src={sendIcon}
              alt="Send icon"
              className="hero__float-icon"
            />
          </div>
          <div className="hero__float hero__float-2">
            <img 
              src={addUserIcon}
              alt="Add user icon"
              className="hero__float-icon"
            />
          </div>

          {/* Bottom Badge */}
          <div className="hero__badge">
            <div className="hero__badge-icon">
              <div className="hero__badge-icon-inner"></div>
            </div>
            <span className="hero__badge-text">
              Explora. Organiza. Disfruta.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;