import React from 'react';
//import './AlertProfile.css'; // Estilos básicos

const AlertProfile = ({ type, message }) => {
  if (!message) return null;

  return (
    <div className={`alert ${type}`}>
      {message}
    </div>
  );
};

export default AlertProfile;