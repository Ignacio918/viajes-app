import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../pages/HeroSection';
import TabsSection from '../components/TabsSection';

const Landing: React.FC = () => {
  return (
    <div className="landing-container">
      <Navbar />
      <HeroSection />
      <TabsSection />
    </div>
  );
};

export default Landing;