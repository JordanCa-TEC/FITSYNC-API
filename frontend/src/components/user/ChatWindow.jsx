import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ChatWindow = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([
    { sender: "Juan", text: "Hola usuario" },
    { sender: "Juan", text: "Te comento unas observaciones del día de hoy." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "Tú", text: input }]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // 🔹 Obtener la lista de entrenadores desde SliceTrainersList.js
  const trainers = useSelector((state) => state.trainersList?.trainers || []);

  // 🔹 Buscar la nutricionista (ID 3) y el entrenador (ID 2) en trainers
  const nutritionist = trainers.find((t) => t.id === 3) || null;
  const trainer = trainers.find((t) => t.id === 2) || null;

  // 🔹 Definir la persona actual según la ruta activa
  const personaActual = location.pathname === "/nutricionista" ? nutritionist : trainer;

  return (
    <div className="chat-window">
      <div className="chat-header">
        {personaActual && (
          <div className="trainer-info">
            <img
              src={personaActual.photo}
              alt={personaActual.name}
              className="trainer-photo"
            />
            <p>
              {personaActual.name} | {location.pathname === "/nutricionista" ? "Nutricionista" : "Entrenador"}
            </p>
          </div>
        )}
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "Tú" ? "user-message" : "bot-message"}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default ChatWindow;
