// Componente - DaySummary.jsx
import React from "react";
import { useSelector } from "react-redux";
import { selectRoutine } from "../../redux/userRoutineSlice";
//import "../../sass/_userDashboard.scss";

const images = {
  brazo: "/assets/brazo.webp",
  espalda: "/assets/espalda.webp",
  gluteos: "/assets/gluteos.webp",
  piernas: "/assets/piernas.webp",
  pecho: "/assets/pecho.webp",
};

const DaySummary = () => {
  const routines = useSelector(selectRoutine);

  return (
    <div className="day-summary">
      <h3>Lunes</h3>
      <p>01 de Noviembre</p>
      <div className="icon-container">
        {routines.slice(0, 3).map((routine, index) => (
          <div key={index} className="icon">
            <img src={images[routine]} alt={routine} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaySummary;