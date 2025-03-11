// TrainersList.jsx
import React from "react";
import "../../sass/_userDashboard.scss";

const TrainersList = ({ trainers }) => {
  return (
    <div className="trainers-list">
      <h3>Entrenadores activos en el Gymnasio</h3>
      <div className="trainers-container">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="trainer">
            <img src={trainer.photo} alt={trainer.name} />
            <span className={`status ${trainer.active ? "online" : "offline"}`}></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainersList;