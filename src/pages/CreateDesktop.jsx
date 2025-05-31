import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistroDesktop = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.contraseña !== formData.confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Datos enviados:", formData);
    navigate("/login");
  };

  return (
    <div className="registro">
      <div className="registro__container">
        <h2 className="registro__title">Registrar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label>Usuario</label>
          <input type="text" name="usuario" onChange={handleChange} required />

          <label>Correo</label>
          <input type="email" name="correo" onChange={handleChange} required />

          <label>Contraseña</label>
          <input type="password" name="contraseña" onChange={handleChange} required />

          <label>Confirmar contraseña</label>
          <input type="password" name="confirmarContraseña" onChange={handleChange} required />

          <div className="registro__buttons">
            <button type="submit" className="btn aceptar">Aceptar</button>
            <button type="button" className="btn cancelar" onClick={() => navigate("/Login")}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroDesktop;
