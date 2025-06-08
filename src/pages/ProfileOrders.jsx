import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserPurchases } from "../redux/purchasesSlice";

const fallbackImage = "/no-image.png";

const ProfileOrders = () => {
  const dispatch = useDispatch();

  // Obtén el userId
 const userId = useSelector((state) => state.profile?.user?.id);

  // Obtén las compras y estado
  const purchases = useSelector((state) => state.purchases.items);
  const status = useSelector((state) => state.purchases.status);
  const error = useSelector((state) => state.purchases.error);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPurchases(userId));
    }
  }, [dispatch, userId]);

  if (status === "loading") return <p>Cargando compras...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

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
                  <li key={item.id || index}>
                    <img
                      src={imageUrl}
                      alt={item.name || item.productoNombre || "Producto"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                      }}
                      width={80}
                      height={80}
                    />
                    <div>
                      <p>{item.name || item.productoNombre || "Sin nombre"}</p>
                      <p>Cantidad: {item.quantity || item.cantidad || 0}</p>
                      <p className="price">
                        Total: s/.{" "}
                        {item.price && item.quantity
                          ? (item.price * item.quantity).toFixed(2)
                          : item.precioUnitario && item.cantidad
                          ? (item.precioUnitario * item.cantidad).toFixed(2)
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
