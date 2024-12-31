import React from 'react';
import '../sass/_aboutDesktop.scss'; 
import { logo_Alternative, fitsync__bio } from '../assets/assets';

const AboutDesktop = () => {
  return (
    <div className="about">

      <section className="about__mission">
        <img src={logo_Alternative} alt="FitSync_Logo" className="about__photo" />
        <p>En FitSync, revolucionamos la forma en que te conectas con tu salud y bienestar. Somos un gimnasio innovador que combina la tecnología de punta con un enfoque personalizado para ayudarte a alcanzar tus metas de fitness de manera eficiente y efectiva. A través de nuestra app exclusiva, brindamos asesoramiento continuo y seguimiento de tu desempeño, tanto dentro como fuera del gimnasio, para que puedas llevar un estilo de vida saludable en cualquier momento y lugar.</p>
        <p>Nuestro equipo de expertos en fitness y nutrición está disponible a un solo clic, ofreciéndote planes personalizados, monitoreo de progresos y soporte constante para maximizar tu rendimiento. En FitSync, creemos que el futuro del entrenamiento es digital, y estamos aquí para guiarte en cada paso de tu transformación. ¡Conéctate, asesórate y transforma tu vida con FitSync!</p>
      </section>
      <section className="about__mission">
        <img src={fitsync__bio} alt="FitSync_Logo" className="about__photo-gym" />
      </section>

    </div>
  );
};

export default AboutDesktop;
