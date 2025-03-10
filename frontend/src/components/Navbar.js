import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/shopSlice";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import { carrito, logo, account_login } from "../assets/assets";
import Cart from "../components/Cart";

const Navbar = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.shop.isCartOpen);
  const navigate = useNavigate(); // Hook para la navegación

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
          {/* Botón de login ahora navega a /login */}
          <button className="cart__button" onClick={() => navigate("/Login")}>
            <img src={account_login} alt="login Account" />
          </button>
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
