import React from 'react';
import { logo, whatsappIcon, tiktokIcon, instagramIcon, facebookIcon } from '../assets/assets.js';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo de FitSync */}
      <div className="footer__logo">
        <img src={logo} alt="FitSync Gym" />
      </div>

      {/* Enlaces principales */}
      <div className="footer__links">
        {/* Primera columna de enlaces */}
        <section className="footer__links__row">
          <h3>FitSync</h3>
          <ul className="footer__menu">
            <li><a href="/about">Quiénes somos</a></li>
            <li><a href="/claims">Libro de reclamaciones</a></li>
            <li><a href="/promotions">Promociones</a></li>
          </ul>
        </section>

        {/* Segunda columna de enlaces */}
        <section className="footer__links__row">
          <h3>Planes</h3>
          <ul className="footer__menu">
            <li><a href="/plans">Conoce nuestros planes</a></li>
            <li><a href="/documents">Documentos</a></li>
          </ul>
        </section>
      </div>

      {/* Íconos de redes sociales */}
      <div className="footer__social">
        <a href="#" aria-label="Facebook"><img src={facebookIcon} alt="Facebook" /></a>
        <a href="#" aria-label="Instagram"><img src={instagramIcon} alt="Instagram" /></a>
        <a href="#" aria-label="TikTok"><img src={tiktokIcon} alt="TikTok" /></a>
        <a href="#" aria-label="WhatsApp"><img src={whatsappIcon} alt="WhatsApp" /></a>
      </div>

      {/* Texto de derechos reservados */}
      <p>&copy; 2024 FitSync Gym - Derechos reservados</p>
    </footer>
  );
};

export default Footer;
