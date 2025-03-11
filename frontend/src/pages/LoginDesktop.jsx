import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { logo_Alternative } from "../assets/assets";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [error, setError] = useState(""); // Estado para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      // Guardar usuario en localStorage y redirigir
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard"); // Cambia "/dashboard" por la ruta que quieras
    } catch (err) {
      setError(err.message);
    }
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
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="error">{error}</p>} {/* Mostrar error si existe */}
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

