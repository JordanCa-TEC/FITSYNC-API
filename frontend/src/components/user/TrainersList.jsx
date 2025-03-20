import React from "react";
import { useSelector } from "react-redux";
import "../../sass/_userDashboard.scss"; 

const TrainersList = () => {
  const { trainers, events } = useSelector((state) => state.trainersList);

  return (
    <div className="dashboard-container-one">
      {/* Entrenadores Activos */}
      <div className="trainers-list">
        <h3 className="title">Entrenadores activos en el Gymnasio</h3>
        <div className="trainers-container">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="trainer">
              <img src={trainer.photo} alt={trainer.name} />
              <span className={`status ${trainer.active ? "online" : "offline"}`}></span>
            </div>
          ))}
        </div>
      </div>

      {/* Horario de Evento */}
      <div className="event-schedule">
        <h3 className="title">Horario de Evento</h3>
        <div className="events">
          {events.map((event, index) => (
            <div key={index} className="event">
              <span className="event-name">{event.name}</span>
              <span className="event-time">{event.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainersList;
