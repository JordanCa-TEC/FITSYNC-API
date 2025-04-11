import React from "react";
import { Link } from "react-router-dom";

const UserMenu = ({ handleLogout }) => {
  return (
    <div className="user-menu">
      <ul>
        <li><Link to="/userdashboard">Inicio</Link></li>
        <li><Link to="/profileuser">Perfil</Link></li>
        <li><Link to="/orders">Compras</Link></li>
        <li><button onClick={handleLogout}>Cerrar sesión</button></li>
      </ul>
    </div>
  );
};

export default UserMenu;

