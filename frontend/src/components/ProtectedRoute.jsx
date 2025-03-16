import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Usuario en localStorage al cargar ProtectedRoute:", storedUser); // <-- LOG
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
