import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.scss";  
import { Provider } from "react-redux"; 
import store from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Verifica si el contenedor existe antes de renderizar
const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <Provider store={store}> 
      <App />
    </Provider>
  );
} else {
  console.error("No se encontró el elemento #root en el DOM.");
}

reportWebVitals();
