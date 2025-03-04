import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleCart, removeFromCart, addToCart } from "../redux/shopSlice"; 
import { trash } from "../assets/assets";
//import '../sass/_cart.scss';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Corrección: Extraer valores por separado
  const cart = useSelector((state) => state.shop.cart);
  const isCartOpen = useSelector((state) => state.shop.isCartOpen);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <div className="cart">
      <div className="cart__content">
        <button className="cart__close" onClick={() => dispatch(toggleCart())}>✖</button>
        <h2>Carrito de Compras</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div className="cart__quantity">
                  <button onClick={() => dispatch(addToCart(item))}>▲</button>
                  <p className="cart__contador" >{item.quantity}</p>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>▼</button>
                </div>
                <img src={item.image || "/placeholder.jpg"} alt={item.name} />
                <h3>{item.name}</h3>
                <p>s/.{item.price.toFixed(2)}</p>
                <button onClick={() => dispatch(removeFromCart(item.id))}><img className="trash" src={trash} alt="shopping cart" /></button>
              </li>
            ))}
          </ul>
        ) : (
          <p>El carrito está vacío</p>
        )}
        <h3>Total: s/.{totalPrice.toFixed(2)}</h3>
        <button className="cart__buy"onClick={() => navigate("/checkoutshop")}>Ir a comprar</button>
      </div>
    </div>
  );
};

export default Cart;
