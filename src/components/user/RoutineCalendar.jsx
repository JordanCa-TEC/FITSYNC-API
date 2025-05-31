import React, { useState, useEffect } from "react";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { moveExercise, saveRoutine, removeExercise, initializeWeek } from "../../redux/exerciseSlice";
import { useDrag, useDrop } from "react-dnd";
import Calendar from "react-calendar";
//import "react-calendar/dist/Calendar.css";


const ItemTypes = { EXERCISE: "exercise" };

const EXERCISES = {
  Brazo: { name: "Brazo", icon: "/brazo.webp", id: "1" },
  Espalda: { name: "Espalda", icon: "/espalda.webp", id: "2" },
  Gluteos: { name: "Glúteos", icon: "/gluteos.webp", id: "3" },
  Pecho: { name: "Pecho", icon: "/pecho.webp", id: "4" },
  Piernas: { name: "Piernas", icon: "/piernas.webp", id: "5" },
};

const ExerciseItem = ({ exercise, day, onRemove, isPastWeek }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EXERCISE,
    item: { exercise, day },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleClick = () => {
    if (day !== "bank" && onRemove) {
      onRemove(exercise.id);
    }
  };

  return (
    <div
      ref={drag}
      className={`exercise-item ${isDragging ? "dragging" : ""} ${day !== "bank" ? "clickable" : ""}`}
      onClick={handleClick}
    >
      <img src={exercise.icon} alt={exercise.name} className="exercise-icon" />
      <span>{exercise.name}</span>
      {day !== "bank" && <span className="remove-icon">×</span>}
    </div>
  );
};

const DayColumn = ({ day, exercises = [], onDropExercise, onRemoveExercise, isPastWeek }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.EXERCISE,
    drop: (item) => {
      if (!isPastWeek && item.day !== day) {
        // Verificar si el ejercicio ya está presente en el día actual
        const isExerciseAlreadyAdded = exercises.some((exercise) => exercise.id === item.exercise.id);

        if (!isExerciseAlreadyAdded) {
          // Llamar la función de agregar el ejercicio solo si no existe
          onDropExercise(item.exercise, item.day, day);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Verificación si la semana es actual o futura
  const isCurrentOrFutureWeek = !isPastWeek;

  return (
    <div ref={drop} className="day-column">
      <div className="day-header">{day}</div>
      <div className="exercise-list">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseItem
              key={`${day}-${exercise.id}`}
              exercise={exercise}
              day={day}
              onRemove={isPastWeek ? null : onRemoveExercise}
            />
          ))
        ) : (
          // Solo mostrar el mensaje si no hay ejercicios y no se está arrastrando un ejercicio
          exercises.length === 0 && !isOver && isCurrentOrFutureWeek && (
            <div className="no-exercise">Arrastra un ejercicio aquí</div>
          )
        )}
      </div>
    </div>
  );
};


const ExerciseBank = () => (
  <div className="exercise-bank">
    <h3>EJERCICIOS</h3>
    <div className="exercise-categories">
      <div className="exercise-group">
        {Object.values(EXERCISES).map((exercise) => (
          <ExerciseItem key={exercise.id} exercise={exercise} day="bank" onRemove={null} />
        ))}
      </div>
    </div>
  </div>
);

const getWeekKey = (date) => {
  const firstDay = new Date(date);
  firstDay.setDate(date.getDate() - firstDay.getDay());
  return `${firstDay.getFullYear()}-W${String(getWeekNumber(firstDay)).padStart(2, "0")}`;
};

const getWeekNumber = (date) => {
  const firstJan = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstJan.getDay() + 1) / 7);
};

const getSpanishDayName = (date) => {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return days[date.getDay()];
};

const defaultRoutine = {
  Lunes: { exercises: [] },
  Martes: { exercises: [] },
  Miércoles: { exercises: [] },
  Jueves: { exercises: [] },
  Viernes: { exercises: [] },
  Sábado: { exercises: [] },
  Domingo: { exercises: [] },
};

const RoutineCalendar = () => {
  const dispatch = useDispatch();
  const routines = useSelector((state) => state.exercises.routines);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekKey = getWeekKey(selectedDate);
  const todayKey = getWeekKey(new Date());
  const currentRoutine = routines[weekKey] || defaultRoutine;
  const selectedDayName = getSpanishDayName(selectedDate);
  const isPastWeek = weekKey < todayKey;

  useEffect(() => {
    const saved = localStorage.getItem("routines");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) dispatch(saveRoutine(parsed));
      } catch (e) {
        console.error("Error al cargar rutinas:", e);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (!routines[weekKey] && routines[todayKey]) {
      dispatch(initializeWeek({ weekKey, baseWeekKey: todayKey }));
    }
  }, [weekKey, routines, dispatch, todayKey]);

  const handleDropExercise = (exercise, fromDay, toDay) => {
    dispatch(moveExercise({ weekKey, fromDay, toDay, exercise }));
  };

  const handleRemoveExercise = (exerciseId, day) => {
    dispatch(removeExercise({ weekKey, day, exerciseId }));
  };

  const handleSaveRoutine = () => {
    const today = new Date();
    if (today.getDay() === 0) {
      localStorage.setItem("routines", JSON.stringify(routines));
      alert("¡Rutina guardada permanentemente!");
    } else {
      alert("Solo puedes guardar rutina el día domingo.");
    }
  };

  const handleClearRoutine = () => {
    if (window.confirm("¿Estás seguro de que no quieres conservar esta rutina?")) {
      localStorage.removeItem("routines");
      window.location.reload();
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="routine-container">
      <div className="header">
        <h1>ACTIVIDAD SEMANAL</h1>
      </div>

      <div className="week-section">
        <div className="week-container">
          {Object.keys(defaultRoutine).map((day) => (
            <DayColumn
              key={day}
              day={day}
              exercises={currentRoutine[day]?.exercises || []}
              onDropExercise={handleDropExercise}
              onRemoveExercise={(exerciseId) => handleRemoveExercise(exerciseId, day)}
              isPastWeek={isPastWeek}
            />
          ))}
        </div>

        {!isPastWeek && (
          <div className="week-container-ask">
            <p>¿QUIERES MANTENER ESTA RUTINA DE FORMA PERMANENTE?</p>
            <button className="save-routine-button" onClick={handleSaveRoutine}>
              SI
            </button>
            <button className="save-routine-button-no" onClick={handleClearRoutine}>
              NO
            </button>
          </div>
        )}
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
        <div className="day-exercises">
          {currentRoutine[selectedDayName]?.exercises?.length > 0 ? (
            currentRoutine[selectedDayName].exercises.map((exercise) => (
              <ExerciseItem
                key={`${selectedDayName}-${exercise.id}`}
                exercise={exercise}
                day={selectedDayName}
                onRemove={isPastWeek ? null : (id) => handleRemoveExercise(id, selectedDayName)}
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
