import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/shopSlice";
import { addPurchase } from "../redux/purchasesSlice";
import "../sass/_checkout.scss";

const CheckoutShop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.shop.cart);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiration: "",
    cvv: "",
    cardholderName: "",
    address: "",
    city: "",
    province: ""
  });
  const [formError, setFormError] = useState("");

  const validPromoCodes = {
    "FIT10": 10,
    "GYM20": 20,
    "HEALTH30": 30
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalWithDiscount = (subtotal * (1 - discount / 100)).toFixed(2);

  const applyPromoCode = () => {
    if (validPromoCodes[promoCode]) {
      setDiscount(validPromoCodes[promoCode]);
      setError("");
    } else {
      setDiscount(0);
      setError("Código inválido. Inténtalo de nuevo.");
    }
  };

  const handleCancel = () => {
    dispatch(clearCart());
    navigate("/shop");
  };

  const handlePurchase = () => {
    if (Object.values(formData).some(value => value.trim() === "")) {
      setFormError("Todos los campos son obligatorios.");
      return;
    }

    setFormError("");
    setShowPopup(true);

    // ✅ Simplificar productos para almacenar solo lo necesario
    const productosSimplificados = cart.map((item) => ({
      id: item.id,
      quantity: item.quantity
    }));

    const nuevaOrden = {
      id: Date.now(),
      productos: productosSimplificados,
      total: totalWithDiscount,
      descuento: discount,
      fecha: new Date().toLocaleString(),
      datosEnvio: formData
    };

    dispatch(addPurchase(nuevaOrden));

    setTimeout(() => {
      setShowPopup(false);
      dispatch(clearCart());
      navigate("/orders");
    }, 1500);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
            </section>

            <section>
              <label>Caducidad:</label>
              <input type="text" name="expiration" value={formData.expiration} onChange={handleInputChange} />
            </section>

            <section>
              <label>CVV:</label>
              <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} />
            </section>

            <section>
              <label>Nombre del titular:</label>
              <input type="text" name="cardholderName" value={formData.cardholderName} onChange={handleInputChange} />
            </section>

            <section>
              <label>Dirección:</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
            </section>

            <section>
              <label>Ciudad:</label>
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
            </section>

            <section>
              <label>Provincia:</label>
              <input type="text" name="province" value={formData.province} onChange={handleInputChange} />
            </section>

            <section>
              <label>Código de Promoción:</label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Ingresa tu código"
              />
              <button type="button" className="aplicar__promo" onClick={applyPromoCode}>Aplicar</button>
              {error && <p className="error-message">{error}</p>}
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
          <section>
            <p>Subtotal: s/. {subtotal.toFixed(2)}</p>
            <p>Descuentos: {discount > 0 ? `-${discount}%` : "0"}</p>
            <p><strong>Total: s/. {totalWithDiscount}</strong></p>
          </section>
        </div>
      </div>

      {formError && <p className="error-message">{formError}</p>}

      <div className="checkout-buttons">
        <button type="button" className="checkout-button" onClick={handlePurchase}>Comprar</button>
        <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-message">Compra realizada</div>
        </div>
      )}
    </div>
  );
};

export default CheckoutShop;
