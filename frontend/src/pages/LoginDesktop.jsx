import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logo_Alternative } from "../assets/assets";

const Login = () => {
  const navigate = useNavigate(); // Se agregó la instancia de navigate
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario:", user, "Contraseña:", password);
    // Aquí puedes manejar la autenticación
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src={logo_Alternative} alt="Logo__gym-fitsync" />
        </div>
        <form onSubmit={handleSubmit}>
          <label>Usuario</label>
          <input 
            type="text" 
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            required 
          />
          <label>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <div className="buttons">
            <button type="submit" className="accept">Aceptar</button>
            <button type="button" className="register" onClick={() => navigate("/record")}>
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
