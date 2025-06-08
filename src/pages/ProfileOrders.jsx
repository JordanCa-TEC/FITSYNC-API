import React from "react";
import { useSelector } from "react-redux";

const fallbackImage = "/no-image.png"; 

const ProfileOrders = () => {
  const purchases = useSelector((state) => state.purchases.items);

  return (
    <div className="profile__orders">
      <h2>Mis Compras</h2>
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase.id}>
            <p>
              <strong>Fecha:</strong>{" "}
              {typeof purchase.fecha === "string"
                ? purchase.fecha
                : JSON.stringify(purchase.fecha)}
            </p>

            <p>
              <strong>Total:</strong> s/. {purchase.total}
            </p>

            <p>
              <strong>Productos:</strong> {purchase.productos?.length || 0}
            </p>

            <ul>
              {purchase.productos?.map((item, index) => {
                // Cambié la extensión a .webp para cargar esas imágenes
                const imageUrl = `/${item.id}.webp`;

                return (
                  <li
                    key={item.id || index}
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <img
                      src={imageUrl}
                      alt={item.name || "Producto"}
                      style={{ width: 80, height: 80, objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null; // evitar loop infinito
                        e.target.src = fallbackImage;
                      }}
                    />
                    <div>
                      <p>{item.name || "Sin nombre"}</p> <br />
                      <p>Cantidad: {item.quantity || 0}</p> <br />
                      <p className="price">
                        Total: s/.{" "}
                        {item.price && item.quantity
                          ? (item.price * item.quantity).toFixed(2)
                          : "0.00"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {purchase.datosEnvio && typeof purchase.datosEnvio === "object" && (
              <p>
                <strong>Enviado a:</strong> {purchase.datosEnvio.address},{" "}
                {purchase.datosEnvio.city}, {purchase.datosEnvio.province}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileOrders;
