import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveExercise, saveRoutine } from "../../redux/exerciseSlice";
import { useDrag, useDrop } from "react-dnd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ItemTypes = { EXERCISE: "exercise" };

const EXERCISES = {
  Brazo: { name: "Brazo", icon: "/brazo.webp", id: "1" },
  Espalda: { name: "Espalda", icon: "/espalda.webp", id: "2" },
  Gluteos: { name: "Glúteos", icon: "/gluteos.webp", id: "3" },
  Pecho: { name: "Pecho", icon: "/pecho.webp", id: "4" },
  Piernas: { name: "Piernas", icon: "/piernas.webp", id: "5" },
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

const DayColumn = ({ day, exercises = [], onDropExercise }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.EXERCISE,
    drop: (item) => {
      if (item.day !== day) {
        onDropExercise(item.exercise, item.day, day);
      }
    },
  }));

  return (
    <div
      ref={drop}
      className={`day-column ${
        day === "Sábado" || day === "Domingo" ? "weekend-day" : ""
      }`}
    >
      <div className="day-header">{day}</div>
      <div className="exercise-list">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <ExerciseItem key={index} exercise={exercise} day={day} />
          ))
        ) : (
          <div className="no-exercise">Arrastra un ejercicio aquí</div>
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
  const weeklyRoutine = useSelector((state) => state.exercises.routine || {
    Lunes: { exercises: [] },
    Martes: { exercises: [] },
    Miércoles: { exercises: [] },
    Jueves: { exercises: [] },
    Viernes: { exercises: [] },
    Sábado: { exercises: [] },
    Domingo: { exercises: [] }
  });
  
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const savedRoutine = localStorage.getItem("weeklyRoutine");
    if (savedRoutine) {
      try {
        const parsed = JSON.parse(savedRoutine);
        if (parsed) {
          dispatch(saveRoutine(parsed));
        }
      } catch (e) {
        console.error("Error loading routine:", e);
      }
    }
  }, [dispatch]);

  const handleDropExercise = (exercise, fromDay, toDay) => {
    dispatch(moveExercise({ fromDay, toDay, exercise }));
  };

  const handleSaveRoutine = () => {
    localStorage.setItem("weeklyRoutine", JSON.stringify(weeklyRoutine));
    alert("¡Rutina guardada permanentemente!");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formattedDay = selectedDate.toLocaleDateString("es-ES", {
    weekday: "long",
  });

  return (
    <div className="routine-container">
      <div className="header">
        <h1>ACTIVIDAD SEMANAL PREDETERMINADA</h1>
      </div>

      <div className="week-section">
        <div className="week-container">
          {[
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
            "Domingo",
          ].map((day) => (
            <DayColumn
              key={day}
              day={day}
              exercises={weeklyRoutine[day]?.exercises || []}
              onDropExercise={handleDropExercise}
            />
          ))}
        </div>
        <div className="week-container-ask">
          <p>¿QUIERES MANTENER ESTA RUTINA DE FORMA PERMANENTE?</p>
          <button className="save-routine-button" onClick={handleSaveRoutine}>
            SI
          </button>
          <button className="save-routine-button-no" onClick={handleSaveRoutine}>
            NO
          </button>
        </div>
      </div>

      <div className="calendar-section">
        <div className="month-calendar">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="calendar-widget"
            locale="es-ES"
          />
        </div>
      </div>

      <div className="selected__day-section">
        <div className="selected__day-section-title">
          <h3>
            {selectedDate.toLocaleDateString("es-ES", {
              weekday: "long",
              day: "2-digit",
              month: "long",
            })}
          </h3>
        </div>
        <p>Arrastra los iconos para modificar tu actividad semanal</p>
        <div className="day-exercises">
          {weeklyRoutine[formattedDay]?.exercises?.length > 0 ? (
            weeklyRoutine[formattedDay].exercises.map((exercise, index) => (
              <ExerciseItem
                key={index}
                exercise={exercise}
                day={formattedDay}
                isDraggable={false}
              />
            ))
          ) : (
            <p>No hay ejercicios asignados para este día.</p>
          )}
        </div>
      </div>

      <ExerciseBank />
    </div>
  );
};

export default RoutineCalendar;