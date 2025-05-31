// ProfileCard.jsx
import React from "react";
import "../../sass/_userDashboard.scss";
import { usuariofoto } from "../../assets/assets";


const ProfileCard = () => {
  return (

<div className="profile-card">
  <div className="profile-background">
    <div className="profile-avatar">
      <img src={usuariofoto} alt="usuario-fitzync" />
    </div>
  </div>
  <div className="profile-info">
    <h2>Nombre de Usuario</h2>
    <p><strong>Objetivo:</strong> Quemar grasa / Tonificar</p>
  </div>
</div>

  );
};

export default ProfileCard;
