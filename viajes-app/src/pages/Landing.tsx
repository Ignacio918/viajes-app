import { FC } from 'react';
import Navbar from '../components/Navbar';

const Landing: FC = () => {
  return (
    <div className="landing-page">
      <Navbar />
      {/* Aquí irán las demás secciones de la landing page */}
    </div>
  );
};

export default Landing;