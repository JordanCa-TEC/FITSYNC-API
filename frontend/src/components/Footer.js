import React, { useState } from 'react';
import { logo, whatsappIcon, tiktokIcon, instagramIcon, facebookIcon } from '../assets/assets.js';

const Footer = () => {
  const [isFitSyncOpen, setFitSyncOpen] = useState(false);
  const [isPlanesOpen, setPlanesOpen] = useState(false);

  return (
    <footer className="footer">
      {/* Logo */}
      <div className="footer__logo">
        <img src={logo} alt="FitSync Gym" />
      </div>

      {/* Menú Desktop */}
      <div className="footer__links footer__links--desktop">
        <section className="footer__links__row">
          <h3>FitSync</h3>
          <ul className="footer__menu">
            <li><a href="/about">Quiénes somos</a></li>
            <li><a href="/claims">Libro de reclamaciones</a></li>
            <li><a href="/promotions">Promociones</a></li>
          </ul>
        </section>

        <section className="footer__links__row">
          <h3>Planes</h3>
          <ul className="footer__menu">
            <li><a href="/plans">Conoce nuestros planes</a></li>
            <li><a href="/documents">Documentos</a></li>
          </ul>
        </section>
      </div>

      {/* Menú Mobile (Acordeón) */}
      <div className="footer__links footer__links--mobile">
        <section className="footer__links__row">
          <h3 onClick={() => setFitSyncOpen(!isFitSyncOpen)} className="footer__toggle">
            FitSync <span>{isFitSyncOpen ? '-' : '+'}</span>
          </h3>
          {isFitSyncOpen && (
            <ul className="footer__menu">
              <li><a href="/about">Quiénes somos</a></li>
              <li><a href="/claims">Libro de reclamaciones</a></li>
              <li><a href="/promotions">Promociones</a></li>
            </ul>
          )}
        </section>

        <section className="footer__links__row">
          <h3 onClick={() => setPlanesOpen(!isPlanesOpen)} className="footer__toggle">
            Planes <span>{isPlanesOpen ? '-' : '+'}</span>
          </h3>
          {isPlanesOpen && (
            <ul className="footer__menu">
              <li><a href="/plans">Conoce nuestros planes</a></li>
              <li><a href="/documents">Documentos</a></li>
            </ul>
          )}
        </section>
      </div>

      {/* Redes sociales */}
      <div className="footer__social">
        <a href="#" aria-label="Facebook"><img src={facebookIcon} alt="Facebook" /></a>
        <a href="#" aria-label="Instagram"><img src={instagramIcon} alt="Instagram" /></a>
        <a href="#" aria-label="TikTok"><img src={tiktokIcon} alt="TikTok" /></a>
        <a href="#" aria-label="WhatsApp"><img src={whatsappIcon} alt="WhatsApp" /></a>
      </div>

      <p>&copy; 2024 FitSync Gym - Derechos reservados</p>
    </footer>
  );
};

export default Footer;
