// ProfileCard.jsx
import React from "react";
import "../../sass/_userDashboard.scss";

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-avatar"></div>
      <div className="profile-info">
        <h2>Nombre de Usuario</h2>
        <p>Objetivo: Quemar grasa / Tonificar</p>
      </div>
    </div>
  );
};

export default ProfileCard;
