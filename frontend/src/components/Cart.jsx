import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, toggleCart } from "../redux/shopSlice";

const Cart = () => {
  const dispatch = useDispatch();
  
  const shopState = useSelector((state) => state.shop || {});  
  const { cart = [], totalPrice = 0, isCartOpen = false } = shopState;

  console.log("Estado completo de Redux:", shopState);
  console.log("Carrito en Redux:", cart);
  console.log("Total Price en Redux:", totalPrice);
  console.log("isCartOpen en Redux:", isCartOpen);

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
        <h3>Total: s/.{totalPrice}</h3>
      </div>
    </div>
  );
};

export default Cart;
