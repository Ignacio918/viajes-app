import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from './HeroSection';
import TabsSection from '../components/TabsSection';

const Landing: React.FC = () => {
  console.log('🔵 Landing RENDERED 🔵');
  
  return (
    <div className="landing-container">
      <Navbar />
      <HeroSection />
      <TabsSection />
      
    </div>
  );
};

export default Landing;