import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MenuButtons = () => {
  const menuItems = [
    { name: "Inicio", path: "/userdashboard" },
    { name: "Guía de Rutina", path: "/usercalendar" },
    { name: "Entrenador", path: "/entrenador" },
    { name: "Nutricionista", path: "/nutricionista" },
  ];

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Buscar el nombre del botón actual según la ruta
  const currentItem = menuItems.find((item) => item.path === location.pathname);
  const currentName = currentItem ? currentItem.name : "Menú";

  return (
    <div className="menu-buttons">
      {/* Botón visible solo en mobile que muestra el nombre actual */}
      <button
        className="menu-buttons__mobile-toggle"
        onClick={() => setOpen(!open)}
      >
        {currentName} <span>{open ? "▲" : "▼"}</span>
      </button>

      {/* Lista visible en desktop y desplegable en mobile */}
      <div className={`menu-buttons__list ${open ? "open" : ""}`}>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={location.pathname === item.path ? "active" : ""}
            onClick={() => {
              navigate(item.path);
              setOpen(false); // Cierra el menú después de hacer clic
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuButtons;
