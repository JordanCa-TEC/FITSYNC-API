import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import AppRoutes from './routes/AppRoutes';  

const App = () => {
  return (
    <Router>  {/* Envuélvelo con BrowserRouter */}
      <AppRoutes />  {/* Aquí llamamos a AppRoutes que contiene las rutas */}
    </Router>
  );
};

export default App;
