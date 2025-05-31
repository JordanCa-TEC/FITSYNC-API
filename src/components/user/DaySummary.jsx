// src/components/user/DaySummary.jsx
import React from "react";
import { useSelector } from "react-redux";
import { selectRoutine } from "../../redux/userRoutineSlice";

const images = {
  brazo: "/brazo.webp",
  espalda: "/espalda.webp",
  gluteos: "/gluteos.webp",
  piernas: "/piernas.webp",
  pecho: "/pecho.webp",
};

const DaySummary = () => {
  const dailyRoutine = useSelector(selectRoutine);

  const today = new Date();
  const dayOfMonth = today.getDate();
  const month = today.toLocaleString("es-ES", { month: "long" });
  const dayName = today.toLocaleString("es-ES", { weekday: "long" });

  return (
    <div className="day-summary">
      <div className="day-summary-box">
        <h3>{dayName.charAt(0).toUpperCase() + dayName.slice(1)}</h3>
      </div>      
      <p>{dayOfMonth} de {month}</p>
      <div className="icon-container">
        {dailyRoutine.map((routine, index) => (
          <div key={index} className="icon">
            <img src={images[routine]} alt={routine} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaySummary;
