// MenuOptions.jsx
import React from "react";
import "../../sass/_userDashboard.scss";

const MenuOptions = () => {
  return (
    <div className="menu-options">
      <button className="menu-options__button-01"><h2>Guía de rutina</h2></button>
      <button className="menu-options__button-02"><h2>Entrenador</h2></button>
      <button className="menu-options__button-03"><h2>Nutricionista</h2></button>
    </div>
  );
};

export default MenuOptions;