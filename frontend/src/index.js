import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
console.log("Estado inicial de Redux antes del render:", store.getState());


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
console.log(store.getState());
console.log("Estado Inicial de Redux:", store.getState());
