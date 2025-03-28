import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveExercise, saveRoutine } from "../../redux/exerciseSlice";
import { useDrag, useDrop } from "react-dnd";

// Definir tipos de ítems para DnD
const ItemTypes = { EXERCISE: "exercise" };

// Componente de cada ejercicio arrastrable
const ExerciseItem = ({ exercise, day }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EXERCISE,
    item: { exercise, day },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`exercise-item ${isDragging ? "dragging" : ""}`}>
      <img src={exercise.icon} alt={exercise.name} />
      <span>{exercise.name}</span>
    </div>
  );
};

// Componente para cada columna de día en el calendario
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
    <div ref={drop} className="day-column">
      <h3>{day}</h3>
      <div className="exercise-list">
        {exercises.map((exercise, index) => (
          <ExerciseItem key={index} exercise={exercise} day={day} />
        ))}
      </div>
    </div>
  );
};

// Componente principal del calendario de rutinas
const RoutineCalendar = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const weeklyRoutine = useSelector((state) => state.exercises.routine);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const savedRoutine = localStorage.getItem("weeklyRoutine");
    if (savedRoutine) {
      dispatch(saveRoutine(JSON.parse(savedRoutine)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isModified) {
      localStorage.setItem("weeklyRoutine", JSON.stringify(weeklyRoutine));
      setIsModified(false);
    }
  }, [weeklyRoutine, isModified]);

  const handleDropExercise = (exercise, fromDay, toDay) => {
    dispatch(moveExercise({ fromDay, toDay, exercise }));
    setIsModified(true);
  };

  return (
    <div className="routine-calendar">
      <div className={`status-bar ${isModified ? "active" : ""}`}>
        {isModified ? "Rutina modificada" : "Rutina guardada"}
      </div>

      {/* Paleta de ejercicios */}
      <div className="exercise-palette">
        <h3>Ejercicios</h3>
        {Object.values(weeklyRoutine)
          .flat()
          .map((exercise, index) => (
            <ExerciseItem key={index} exercise={exercise} day={null} />
          ))}
      </div>

      {/* Grilla semanal */}
      <div className="week-grid">
        {Object.entries(weeklyRoutine).map(([day, exercises]) => (
          <DayColumn
            key={day}
            day={day}
            exercises={exercises}
            onDropExercise={handleDropExercise}
          />
        ))}
      </div>
    </div>
  );
};

export default RoutineCalendar;
