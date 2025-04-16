import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPurchases } from "../../../redux/purchasesSlice";

const PurchaseHistory = ({ userId }) => {
  const dispatch = useDispatch();
  const { items: purchases, status } = useSelector((state) => state.purchases);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPurchases(userId));
    }
  }, [dispatch, userId]);

  if (status === "loading") return <p>Cargando compras...</p>;
  if (status === "failed") return <p>Error al cargar el historial de compras.</p>;
  if (!purchases.length) return <p>No has realizado ninguna compra todavía.</p>;

  return (
    <div className="purchase-history">
      <h2>Historial de Compras</h2>
      {purchases.map((purchase) => (
        <div key={purchase.id} className="purchase">
          <p><strong>Fecha:</strong> {purchase.date}</p>
          <p><strong>Total:</strong> ${purchase.total}</p>
          <ul>
            {purchase.items.map((item, i) => (
              <li key={i}>{item.name} - ${item.price} x {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PurchaseHistory;
