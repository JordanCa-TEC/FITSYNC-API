import React from "react";
import { useSelector } from "react-redux";

const ProfileOrders = () => {
  // Verifica que el estado esté correctamente estructurado
  const purchases = useSelector((state) => state.purchases.purchases);

  if (!purchases || purchases.length === 0) {
    return (
      <div className="profile-orders">
        <h2>🛍️ Mis Compras</h2>
        <p>No tienes compras registradas.</p>
      </div>
    );
  }

  return (
    <div className="profile-orders">
      <h2>🛍️ Mis Compras</h2>
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
            <p><strong>📅 Fecha:</strong> {purchase.fecha}</p>
            <p><strong>📦 Productos:</strong> {purchase.productos.length}</p>
            <p><strong>💸 Total:</strong> s/. {purchase.total}</p>

            <ul>
              {purchase.productos.map((item, index) => (
                <li key={index} style={{ marginLeft: "1rem" }}>
                  🧴 {item.name} (x{item.quantity}) - s/. {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>

            <p><strong>🚚 Enviado a:</strong> {purchase.datosEnvio.address}, {purchase.datosEnvio.city}, {purchase.datosEnvio.province}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileOrders;
