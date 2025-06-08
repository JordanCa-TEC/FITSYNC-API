import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserPurchases } from "../redux/purchasesSlice";
import { getProfile } from "../redux/profileActions";

const fallbackImage = "/no-image.png";

const ProfileOrders = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.profile?.userData);
  const userId = userData?.id;

  const purchases = useSelector((state) => state.purchases?.items ?? []);
  const status = useSelector((state) => state.purchases?.status);
  const error = useSelector((state) => state.purchases?.error);

  // Estado local para catálogo de productos cargado desde JSON local
  const [productsCatalog, setProductsCatalog] = useState([]);

  useEffect(() => {
    // Cargar catálogo local de productos desde public/products.json
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProductsCatalog(data))
      .catch((err) => {
        console.error("Error cargando productos locales:", err);
      });
  }, []);

  useEffect(() => {
    if (!userData) {
      dispatch(getProfile());
      return;
    }

    if (userId) {
      dispatch(fetchUserPurchases(userId));
    }
  }, [dispatch, userId, userData]);

  if (status === "loading") return <p>Cargando compras...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="profile__orders">
      <h2>Mis Compras</h2>
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase.id}>
            <p>
              <strong>Fecha:</strong> {purchase.fecha}
            </p>
            <p>
              <strong>Total:</strong> s/. {purchase.total}
            </p>
            <ul>
              {purchase.productos?.map((item, i) => {
                // Buscar el producto en el catálogo local por id (o id que corresponda)
                const product = productsCatalog.find((p) => p.id === item.id);

                // Usar datos del catálogo local si existe, sino usa los datos del item
                const name = product?.name || item.name || "Producto sin nombre";
                const price = product?.price ?? item.price ?? 0;

                const quantity = item.quantity ?? item.cantidad ?? 1;
                const totalPrice = (price * quantity).toFixed(2);

                // Mantener img local que tenías, o cambiar si quieres imagen del producto local
                const img = product?.image || `/${item.id}.webp`;

                return (
                  <li
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                  >
                    <img
                      src={img}
                      alt={name}
                      onError={(e) => (e.target.src = fallbackImage)}
                      width={80}
                      height={80}
                    />
                    <div>
                      <p>{name}</p>
                      <p>Cantidad: {quantity}</p>
                      <p className="price">Total: s/. {totalPrice}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileOrders;
