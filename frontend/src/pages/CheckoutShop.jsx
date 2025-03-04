import React from "react";
import { useSelector } from "react-redux";

const CheckoutShop = () => {
    const cart = useSelector((state) => state.shop.cart); // ⚠️ Accediendo a `cart` dentro de `shop`
  
    if (!cart || !cart.items) {
      return <p>El carrito está vacío.</p>;
    }

  return (
    <div className="checkout">
      <h2>Resumen de la compra</h2>
      <form>
        <label>N° de Tarjeta:</label>
        <input type="text" />

        <label>Caducidad:</label>
        <input type="text" />

        <label>CVV:</label>
        <input type="text" />

        <label>Nombre del titular:</label>
        <input type="text" />

        <label>Dirección:</label>
        <input type="text" />

        <label>Ciudad:</label>
        <input type="text" />

        <label>Provincia:</label>
        <input type="text" />

        <button type="submit">Comprar</button>
      </form>

      <div className="cart-summary">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>s/. {item.price}</p>
          </div>
        ))}

        <div className="totals">
          <p>Descuentos: 0</p>
          <p>Subtotal: 0</p>
          <p>Total: 0</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutShop;
