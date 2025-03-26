// MenuOptions.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/_userDashboard.scss";

const MenuOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-options">
      <button className="menu-options__button-01" onClick={() => navigate("/rutina")}><h2>Guía de rutina</h2></button>
      <button className="menu-options__button-02" onClick={() => navigate("/entrenador")} ><h2>Entrenador</h2></button>
      <button className="menu-options__button-03" onClick={() => navigate("/nutricionista")}><h2>Nutricionista</h2></button>
    </div>
  );
};

export default MenuOptions;