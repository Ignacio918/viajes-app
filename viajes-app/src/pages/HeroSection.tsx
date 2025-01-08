import React from 'react';
import '../styles/HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-[#FDFDFD]">
      <div className="flex justify-between items-center px-24 pt-36">
        {/* Left Section - Text Content */}
        <div className="w-[502px] flex flex-col gap-8">
          <h1 className="text-6xl font-bold font-urbanist">
            <span className="text-[#161616]">Descubre la manera </span>
            <span className="text-[#E61C5D]">más fácil de planificar</span>
            <br />
            <span className="text-[#161616]">tu próxima aventura</span>
          </h1>
          
          <div className="flex flex-col gap-6">
            <p className="text-lg text-black/20 font-urbanist">
              Con zentrip, tienes todo lo necesario para transformar tus viajes en momentos únicos.
            </p>
            <button className="inline-flex px-4 py-4 bg-[#161616] text-white rounded-full items-center justify-center">
              <span className="text-xl font-medium font-urbanist">
                Comenzar a planificar mi viaje
              </span>
            </button>
          </div>
        </div>

        {/* Right Section - Images */}
        <div className="relative w-[792px] h-[725px]">
          {/* Background Shapes */}
          <div className="absolute right-0 top-10 w-[147px] h-[275px] bg-[#E61C5D] p-2.5">
            <div className="w-full h-full bg-[#E61C5D]"></div>
          </div>
          <div className="absolute left-0 top-[67px] w-[250px] h-[265px] p-2.5">
            <div className="w-full h-full bg-[#E61C5D]"></div>
          </div>
          <div className="absolute left-[56px] top-0 w-[660px] h-[268px] bg-[#FFE8EF]"></div>

          {/* Images */}
          <div className="absolute left-[136px] top-[57px]">
            <img 
              src="/src/assets/image1.jpg" 
              alt="Travel image 1"
              className="w-[272px] h-[310px] rounded-[32px] object-cover"
            />
          </div>
          <div className="absolute left-[136px] top-[397px]">
            <img 
              src="/src/assets/image2.jpg" 
              alt="Travel image 2"
              className="w-[272px] h-[310px] rounded-[32px] object-cover"
            />
          </div>
          <div className="absolute left-[440px] top-[131px]">
            <img 
              src="/src/assets/image3.jpg" 
              alt="Travel image 3"
              className="w-[272px] h-[377px] rounded-[32px] object-cover"
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute left-[104px] top-[338px] w-16 h-16 bg-[#E61C5D] rounded-full shadow-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-white"></div>
          </div>
          <div className="absolute left-[627px] top-[483px] w-16 h-16 bg-[#E61C5D] rounded-full shadow-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-white"></div>
          </div>

          {/* Bottom Badge */}
          <div className="absolute left-[376px] top-[627px] px-8 py-4 bg-white rounded-full border border-[#E61C5D] shadow-lg flex items-center gap-2">
            <div className="w-6 h-6 relative">
              <div className="w-[17px] h-5 bg-[#E61C5D] absolute left-[3.5px] top-[2px]"></div>
            </div>
            <span className="text-[#161616] text-sm font-bold font-urbanist leading-[16.8px]">
              Explora. Organiza. Disfruta.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;