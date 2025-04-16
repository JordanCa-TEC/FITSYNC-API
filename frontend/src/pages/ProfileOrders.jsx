import React from "react";
import { useSelector } from "react-redux";
import "../sass/_PurchaseHistory.scss";

const ProfileOrders = () => {
  const user = useSelector((state) => state.auth?.user);

  // Datos simulados de compras
  const purchases = [
    {
      date: "15/04/2025",
      total: 75,
      items: [
        { name: "Creatina", price: 25, quantity: 1 },
        { name: "Proteína", price: 50, quantity: 1 },
      ],
    },
    {
      date: "12/04/2025",
      total: 100,
      items: [
        { name: "BCAA", price: 60, quantity: 1 },
        { name: "Multivitamínico", price: 40, quantity: 1 },
      ],
    },
  ];

  if (!user) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Historial de compras de {user.name}</h1>

      <div className="purchase-history">
        {purchases.map((purchase, index) => (
          <div className="purchase-history__order" key={index}>
            <div className="purchase-history__header">
              <span className="purchase-history__date">{purchase.date}</span>
              <span className="purchase-history__total">
                Total: ${purchase.total}
              </span>
            </div>
            <ul className="purchase-history__items">
              {purchase.items.map((item, idx) => (
                <li className="purchase-history__item" key={idx}>
                  <span className="item__name">{item.name}</span>
                  <span className="item__price">${item.price}</span>
                  <span className="item__quantity">x{item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileOrders;
