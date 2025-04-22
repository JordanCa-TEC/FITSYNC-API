import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; 
import AppRoutes from "./routes/AppRoutes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";  

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <AppRoutes />
      </Router>
    </DndProvider>
  );
};

export default App;