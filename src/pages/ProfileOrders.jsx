import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserPurchases } from "../redux/purchasesSlice";

const fallbackImage = "/no-image.png";

const ProfileOrders = ({ userId }) => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases.items);
  const status = useSelector((state) => state.purchases.status);
  const error = useSelector((state) => state.purchases.error);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPurchases(userId));
    }
  }, [userId, dispatch]);

  if (status === "loading") return <p>Cargando compras...</p>;
  if (status === "failed") return <p>{error}</p>;

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
                        e.target.onerror = null;
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
