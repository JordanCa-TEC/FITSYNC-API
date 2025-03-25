import { useState } from "react";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { sender: "Juan", text: "Hola Usuario" },
    { sender: "Juan", text: "Te comento unas observaciones del día de hoy." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "Tú", text: input };
    setMessages([...messages, newMessage]);
    setInput("");

    // Simular respuesta de IA
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "Juan", text: "¡Entendido! Sigue esforzándote." }]);
    }, 1000);
  };

  return (
    <div className="chat-window bg-gray-100 p-4 rounded-lg w-96">
      <div className="chat-header font-bold mb-2">Juan | Entrenador</div>
      <div className="chat-body h-60 overflow-y-auto bg-white p-2 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "Tú" ? "text-right" : "text-left"}>
            <span className={`inline-block p-2 rounded-lg ${msg.sender === "Tú" ? "bg-yellow-300" : "bg-gray-200"}`}>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-footer mt-2 flex">
        <input
          className="flex-grow p-2 border rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button className="bg-yellow-400 px-4 py-2 rounded-r" onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default ChatWindow;