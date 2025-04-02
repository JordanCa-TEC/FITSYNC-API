import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveExercise, saveRoutine } from "../../redux/exerciseSlice";
import { useDrag, useDrop } from "react-dnd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ItemTypes = { EXERCISE: "exercise" };

// Definimos los ejercicios disponibles con sus iconos
const EXERCISES = {
  Brazo: { name: "Brazo", icon: "/brazo.webp" },
  Espalda: { name: "Espalda", icon: "/espalda.webp" },
  Gluteos: { name: "Glúteos", icon: "/gluteos.webp" },
  Pecho: { name: "Pecho", icon: "/pecho.webp" },
  Piernas: { name: "Piernas", icon: "/piernas.webp" }
};

const ExerciseItem = ({ exercise, day, isDraggable = true }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EXERCISE,
    item: { exercise, day },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isDraggable,
  }));

  return (
    <div 
      ref={isDraggable ? drag : null}
      className={`exercise-item ${isDragging ? "dragging" : ""}`}
    >
      <img src={exercise.icon} alt={exercise.name} className="exercise-icon" />
      <span>{exercise.name}</span>
    </div>
  );
};

const DayColumn = ({ day, exercises, onDropExercise }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.EXERCISE,
    drop: (item) => {
      if (item.day !== day) {
        onDropExercise(item.exercise, item.day, day);
      }
    },
  }));

  return (
    <div ref={drop} className={`day-column ${day === 'Sábado' || day === 'Domingo' ? 'weekend-day' : ''}`}>
      <div className="day-header">{day}</div>
      <div className="exercise-list">
        {exercises?.length > 0 ? (
          exercises.map((exercise, index) => (
            <ExerciseItem key={index} exercise={exercise} day={day} />
          ))
        ) : (
          day === 'Domingo' ? <div className="no-exercise">NO</div> : null
        )}
      </div>
    </div>
  );
};

const ExerciseBank = () => {
  return (
    <div className="exercise-bank">
      <h3>EJERCICIOS</h3>
      <div className="exercise-categories">
        <div className="exercise-group">
        {Object.entries(EXERCISES).map(([category, exercise]) => (
          <ExerciseItem 
            key={category}
            exercise={exercise}
            day="bank"
            isDraggable={true}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

const RoutineCalendar = () => {
  const dispatch = useDispatch();
  const weeklyRoutine = useSelector((state) => state.exercises.routine) || {};
  const [isModified, setIsModified] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const savedRoutine = localStorage.getItem("weeklyRoutine");
    if (savedRoutine) {
      dispatch(saveRoutine(JSON.parse(savedRoutine)));
    }
  }, [dispatch]);

  const handleDropExercise = (exercise, fromDay, toDay) => {
    dispatch(moveExercise({ fromDay, toDay, exercise }));
    setIsModified(true);
  };

  const handleSaveRoutine = () => {
    localStorage.setItem("weeklyRoutine", JSON.stringify(weeklyRoutine));
    setIsModified(false);
    alert("¡Rutina guardada permanentemente!");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentMonth(date);
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  };

  return (
    <div className="routine-container">
      <div className="header">
        <h1>ACTIVIDAD SEMANAL PREDETERMINADA</h1>
      </div>

      <div className="week-section">
        <div className="week-container">
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
            <DayColumn
              key={day}
              day={day}
              exercises={weeklyRoutine[day]}
              onDropExercise={handleDropExercise}
            />
          ))}
        </div>
        
        <button 
          className="save-routine-button"
          onClick={handleSaveRoutine}
        >
          ¿QUIERES MANTENER ESTA RUTINA DE FORMA PERMANENTE?
        </button>
      </div>

      <div className="calendar-section">
        <div className="month-calendar">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="calendar-widget"
            locale="es-ES"
            view="month"
            onActiveStartDateChange={({ activeStartDate }) => {
              setCurrentMonth(activeStartDate);
            }}
          />
        </div>
      </div>

      <div className="selected-day-section">
        <h3>{selectedDate.toLocaleDateString("es-ES", { weekday: "long", day: "2-digit", month: "long" })}</h3>
        <p>Arrastra los iconos para modificar tu actividad semanal</p>
        <div className="day-exercises">
          {weeklyRoutine[selectedDate.toLocaleDateString("es-ES", { weekday: "long" })]?.length > 0 ? (
            weeklyRoutine[selectedDate.toLocaleDateString("es-ES", { weekday: "long" })].map((exercise, index) => (
              <ExerciseItem 
                key={index} 
                exercise={exercise} 
                day={selectedDate}
                isDraggable={false}
              />
            ))
          ) : (
            <p>No hay ejercicios asignados</p>
          )}
        </div>
      </div>

      <ExerciseBank />
    </div>
  );
};

export default RoutineCalendar;