import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPurchases } from "../redux/purchasesSlice"; // Ajusta ruta según tu estructura

const ProfileOrders = ({ userId }) => {
  const dispatch = useDispatch();
  const { items: purchases, status, error } = useSelector((state) => state.purchases);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPurchases(userId));
    }
  }, [dispatch, userId]);

  if (status === "loading") return <p>Cargando tus compras...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="profile-orders">
      <h2>🛍️ Mis Compras</h2>
      {purchases.length === 0 ? (
        <p>No tienes compras registradas.</p>
      ) : (
        <ul>
          {purchases.map((purchase) => (
            <li key={purchase.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
              <p><strong>📅 Fecha:</strong> {purchase.date}</p>
              <p><strong>🧾 Productos:</strong> {purchase.items.length}</p>
              <p>
                <strong>💸 Total:</strong>{" "}
                {purchase.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileOrders;
