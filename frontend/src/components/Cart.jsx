import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, toggleCart } from "../redux/shopSlice";

const Cart = () => {
  const dispatch = useDispatch();
  
  const { cart = [], isCartOpen = false } = useSelector((state) => state.shop || {});
  
  // Calcular el total dinámicamente en lugar de depender de Redux (opcional)
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  if (!isCartOpen) return null;

  return (
    <div className="cart">
      <div className="cart__content">
        <button className="cart__close" onClick={() => dispatch(toggleCart())}>✖</button>
        <h2>Carrito de Compras</h2>
        <ul>
          {cart.length > 0 ? (
            cart.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>s/.{item.price}</p>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>Eliminar</button>
                </div>
              </li>
            ))
          ) : (
            <p>El carrito está vacío</p>
          )}
        </ul>
        <h3>Total: s/.{totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
