import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from './HeroSection';
import TravelTabs from '../components/TravelTabs';

const Landing: React.FC = () => {
  console.log('🔵 Landing RENDERED 🔵');
  
  return (
    <div className="landing-container">
      <Navbar />


    </div>
  );
};

export default Landing;