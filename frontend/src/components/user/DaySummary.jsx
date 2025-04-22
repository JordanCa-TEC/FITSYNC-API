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

// Asigna los ejercicios según el día de la semana
const weeklyRoutine = {
  0: ["pecho", "espalda", "brazo"], // Domingo
  1: ["piernas", "gluteos"], // Lunes
  2: ["espalda", "pecho"], // Martes
  3: ["brazo", "piernas", "espalda"], // Miércoles
  4: ["brazo"], // Jueves
  5: [ "brazo", "espalda"], // Viernes
  6: ["pecho", "gluteos", "brazo"], // Sábado
};

const DaySummary = () => {
  const routines = useSelector(selectRoutine);

  // Obtener fecha actual
  const today = new Date();
  const dayIndex = today.getDay(); // 0 (Domingo) - 6 (Sábado)
  const dayOfMonth = today.getDate();
  const month = today.toLocaleString("es-ES", { month: "long" }); // Nombre del mes en español
  const dayName = today.toLocaleString("es-ES", { weekday: "long" }); // Día de la semana

  // Obtener rutina del día
  const dailyRoutine = weeklyRoutine[dayIndex];

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
