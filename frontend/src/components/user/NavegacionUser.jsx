import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MenuButtons = () => {
  const menuItems = [
    { name: "Inicio", path: "/userdashboard" },
    { name: "Guía de Rutina", path: "/rutina" },
    { name: "Entrenador", path: "/entrenador" },
    { name: "Nutricionista", path: "/nutricionista" },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="menu-buttons">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={location.pathname === item.path ? "active" : ""}
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default MenuButtons;

