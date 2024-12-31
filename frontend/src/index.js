import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';  // Importa los estilos globales
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
