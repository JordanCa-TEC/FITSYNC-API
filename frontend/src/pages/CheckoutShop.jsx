import React from "react";
import { useSelector } from "react-redux";
import "../sass/_checkout.scss";

const CheckoutShop = () => {
  const cart = useSelector((state) => state.shop.cart);

  if (!cart || cart.length === 0) {
    return <p>El carrito está vacío.</p>;
  }

  return (
    <div className="checkout">
      <h2 className="checkout-title">Resumen de la compra</h2>

      <div className="checkout-content">
        <div className="checkout-form">
          <form>
            <section>
              <label>N° de Tarjeta:</label>
              <input type="text" />
            </section>

            <section>
              <label>Caducidad:</label>
              <input type="text" />
            </section>
            
            <section>
              <label>CVV:</label>
              <input type="text" />
            </section>
            
            <section>
              <label>Nombre del titular:</label>
              <input type="text" />
            </section>
            
            <section>
              <label>Dirección:</label>
              <input type="text" />
            </section>
            
            <section>
              <label>Ciudad:</label>
              <input type="text" />
            </section>
            
            <section>
              <label>Provincia:</label>
              <input type="text" />
            </section>
            
            <section>
            <label>Código de Promoción:</label>
            <input type="text" />
            </section>
            
          </form>
        </div>

        <div className="cart-summary">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <p>{item.name}</p>
                <p>Cantidad: {item.quantity}</p>
                <p className="price">Precio unitario: s/. {item.price.toFixed(2)}</p>
                <p className="price">Total: s/. {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="totals">
              <p>Descuentos: 0</p>
              <p>Subtotal: s/. {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
              <p>Total: s/. {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="checkout-buttons">
        <button type="submit" className="checkout-button">Comprar</button>
        <button type="submit" className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
};

export default CheckoutShop;
