import React from 'react';
import '../sass/_ContactDesktop.scss';
import { whatsappIconMain, emailFitsync, gpsFitsync } from '../assets/assets';

const ContactDesktop = () => {
  return (
    <div className='contact'>
    <section className="contact__mission">
      <h1>Contáctanos</h1>
    </section>
    <section className='contact__box'>
      <div className='info__container' >
        <div className='info__Main'>
          <img src={whatsappIconMain} alt='whatsapp-icon' />
          <p>+51 992 721 688</p>
        </div>
        <div className='info__Main'>
          <img src={emailFitsync} alt='email-icon' />
          <p>servicioalcliente@fitsync.com</p>
        </div>
        <div className='info__Main-gps'>
          <img src={gpsFitsync} alt='gps-icon' />
          <p>Mall Plaza San Miguel Tercer piso, Tienda 465</p>
        </div>
      </div>
      <div className='map-container'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15606.216935274828!2d-77.0771852490112!3d-12.074161669380048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c970336b0725%3A0xae2a6f969b48786e!2sPlaza%20San%20Miguel!5e0!3m2!1ses!2spe!4v1732198547262!5m2!1ses!2spe"
          title="Google Maps"
          width="1200"
          height="650"
          style={{ border: "0" }} 
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>      
      </div>
    </section>
  </div>
  );
};

export default ContactDesktop;
