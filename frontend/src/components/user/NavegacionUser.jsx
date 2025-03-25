import React from "react";

const MenuButtons = ({ onSelect }) => {
  const menuItems = ["Inicio", "Guía de Rutina", "Entrenador", "Nutricionista"];
  return (
    <div className="menu-buttons flex space-x-2 p-2 bg-gray-200 rounded-lg">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`px-4 py-2 ${item === "Entrenador" ? "bg-yellow-400" : "bg-gray-300"} rounded-md`}
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default MenuButtons;