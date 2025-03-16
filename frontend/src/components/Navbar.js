import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/shopSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { carrito, logo, account_login } from "../assets/assets";
import Cart from "../components/Cart";
import UserMenu from "../components/user/UserMenu";

const Navbar = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.shop.isCartOpen);
  const navigate = useNavigate();
  const location = useLocation(); // Detectar cambios en la URL

  const [loggedUser, setLoggedUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú de usuario

  // Verificar si hay usuario en localStorage al cargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
  }, []);

  // Cerrar el menú cuando cambie la ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("user"); // Eliminar usuario
    setLoggedUser(null); // Actualizar estado
    setIsMenuOpen(false); // Cerrar el menú
    navigate("/"); // Redirigir a inicio
  };

  // Función para manejar el clic en el botón de usuario
  const handleUserClick = () => {
    if (!loggedUser) {
      navigate("/login"); // Si no está logueado, ir a login
    } else {
      setIsMenuOpen(!isMenuOpen); // Si está logueado, abrir/cerrar menú
    }
  };

  return (
    <header className="home__header">
      <nav className="navbar">
        <img src={logo} alt="Logo__gym-fitsync" className="navbar__logo" />
        <ul className="navbar__menu-Principal">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/about">Quiénes somos</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
        </ul>
        <div className="navbar__menu-icon">
          {/* Botón del carrito */}
          <button className="cart__button" onClick={() => dispatch(toggleCart())}>
            <img src={carrito} alt="shopping cart" />
          </button>

          {/* Botón de usuario */}
          <button className="cart__button" onClick={handleUserClick}>
            <img src={account_login} alt="login Account" />
          </button>

          {/* Mostrar menú de usuario si está logueado y el menú está abierto */}
          {loggedUser && isMenuOpen && <UserMenu handleLogout={handleLogout} closeMenu={() => setIsMenuOpen(false)} />}
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
