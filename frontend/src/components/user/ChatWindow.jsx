import React, { useState } from "react";

const randomResponses = [
  "Interesante, cuéntame más.",
  "Eso suena genial, sigue así!",
  "Gracias por compartirlo!",
  "¿Tienes alguna otra duda?",
  "Buen punto, lo tomaré en cuenta.",
  "¡Eso es motivador!",
  "Entiendo, podemos trabajar en ello juntos.",
];

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { sender: "Juan", text: "Hola usuario" },
    { sender: "Juan", text: "Te comento unas observaciones del día de hoy." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessages = [...messages, { sender: "Tú", text: input }];
      setMessages(newMessages);
      setInput("");
      
      setTimeout(() => {
        const randomResponse =
          randomResponses[Math.floor(Math.random() * randomResponses.length)];
        setMessages((prevMessages) => [...prevMessages, { sender: "Juan", text: randomResponse }]);
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">Juan | Entrenador</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "Tú" ? "user-message" : "bot-message"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default ChatWindow;
