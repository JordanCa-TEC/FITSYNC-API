// EventSchedule.jsx
import React from "react";
import "../../sass/_userDashboard.scss";

const EventSchedule = ({ routine }) => {
  return (
    <div className="event-schedule">
      <h3>Horario de Evento</h3>
      <div className="events">
        {routine.map((event, index) => (
          <div key={index} className="event">
            <h4>{event.name}</h4>
            <p>{event.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSchedule;