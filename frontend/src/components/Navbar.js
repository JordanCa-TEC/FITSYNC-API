import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/shopSlice";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import { carrito, logo, account_login } from "../assets/assets";
import Cart from "../components/Cart";

const Navbar = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.shop.isCartOpen);
  const navigate = useNavigate(); // Hook para la navegación

  const [loggedUser, setLoggedUser] = useState(null);

  // Verificar si hay usuario en localStorage al cargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("user"); // Eliminar usuario
    setLoggedUser(null); // Actualizar estado
    navigate("/"); // Redirigir a inicio
  };

  console.log("Estado en Navbar:", isCartOpen);

  return (
    <header className="home__header">
      <nav className="navbar">
        <img src={logo} alt="Logo__gym-fitsync" className="navbar__logo" />
        <ul className="navbar__menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/about">Quiénes somos</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="navbar__menu">
          {/* Botón del carrito */}
          <button className="cart__button" onClick={() => dispatch(toggleCart())}>
            <img src={carrito} alt="shopping cart" />
          </button>

          {/* Si el usuario está logueado, mostrar "Cerrar sesión" */}
          {loggedUser ? (
            <button className="cart__button" onClick={handleLogout}>
              <img src={account_login} alt="Cerrar sesión" />
            </button>
          ) : (
            <button className="cart__button" onClick={() => navigate("/Login")}>
              <img src={account_login} alt="login Account" />
            </button>
          )}
        </div>
        {isCartOpen && (
          <div className="cart">
            <Cart />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
