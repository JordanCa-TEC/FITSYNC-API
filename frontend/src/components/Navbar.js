import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/shopSlice"; 
import { Link } from "react-router-dom";
import {carrito} from "../assets/assets"; 

const Navbar = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.shop.isCartOpen); // Verifica si el carrito está abierto

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <button className="cart-button" onClick={() => dispatch(toggleCart())}>
        <img src={carrito} alt="shopping cart" />
      </button>
      {isCartOpen && <div className="cart-dropdown">Carrito abierto</div>} 
    </nav>
  );
};

export default Navbar;
