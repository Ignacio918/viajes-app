import React from 'react';
import '../styles/HeroSection.css';
// Imágenes de lugares
import bigBen from '../assets/imagen_bigben.png';
import coliseo from '../assets/imagen_coliseo.png';
import torreEiffel from '../assets/imagen_torreeiffel.png';
// Iconos
import sendIcon from '../assets/send.svg';
import addUserIcon from '../assets/add-user-2.svg';
import locationIcon from '../assets/icon_location.svg';

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

          {/* Location Icon near the map */}
          <div className="hero__location-icon">
            <img 
              src={locationIcon} 
              alt="Location icon"
              className="hero__icon"
            />
          </div>

          {/* Images */}
          <div className="hero__image-1">
            <img 
              src={bigBen}
              alt="Big Ben"
              className="hero__image"
            />
          </div>
          <div className="hero__image-2">
            <img 
              src={coliseo}
              alt="Coliseo"
              className="hero__image"
            />
          </div>
          <div className="hero__image-3">
            <img 
              src={torreEiffel}
              alt="Torre Eiffel"
              className="hero__image hero__image--tall"
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
              <img 
                src={locationIcon}
                alt="Location icon"
                className="hero__badge-icon-inner"
              />
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