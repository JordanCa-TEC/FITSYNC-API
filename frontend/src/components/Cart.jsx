import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart, removeFromCart } from "../redux/shopSlice"; 

const Cart = () => {
  const dispatch = useDispatch();

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
                <img src={item.image || "/placeholder.jpg"} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Precio: s/.{item.price.toFixed(2)}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>El carrito está vacío</p>
        )}
        <h3>Total: s/.{totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
