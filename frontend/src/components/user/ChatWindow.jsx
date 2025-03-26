import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { sender: "Juan", text: "Hola usuario" },
    { sender: "Juan", text: "Te comento unas observaciones del día de hoy." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { sender: "Tú", text: input }];
    setMessages(newMessages);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // 🔹 Obtener la lista de entrenadores desde Redux
  const { trainers } = useSelector((state) => state.trainersList);
  const trainer = trainers?.[1]; // 🔹 Segundo entrenador (Juan)

  return (
    <div className="chat-window">
      <div className="chat-header">
        {trainer && (
          <div className="trainer-info">
            <img src={trainer.photo} alt={trainer.name} className="trainer-photo" />
            <p>{trainer.name} | Entrenador</p>
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
