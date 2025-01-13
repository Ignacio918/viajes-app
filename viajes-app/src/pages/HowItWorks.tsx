// src/pages/HowItWorks.tsx
import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="relative w-full h-full bg-[#FDFDFD]">
      <div className="absolute w-full h-full">
        <div className="absolute w-[1440px] h-[810px] left-0 top-0 bg-gradient-radial from-transparent to-black"></div>
        <img 
          className="absolute w-[537px] h-[768px] left-[124px] top-[21px] shadow-lg rounded-2xl" 
          src="https://via.placeholder.com/537x768" 
          alt="Random"
        />
      </div>
    </section>
  );
};

export default HowItWorks;