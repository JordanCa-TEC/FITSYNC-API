// src/components/ProfileOrders.jsx
import { useSelector } from "react-redux";

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
              {purchase.productos?.map((item, index) => (
                <li key={index}>
                  <img src={`${process.env.REACT_APP_API_URL}/${item.image}`} alt={item.name} />
                  <div>
                    <span>{item.name}</span> <br />
                    <span>Cantidad: {item.quantity}</span> <br />
                    <span className="price">
                      Total: s/. {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>


            {purchase.datosEnvio && typeof purchase.datosEnvio === "object" && (
              <p>
                <strong>Enviado a:</strong>{" "}
                {purchase.datosEnvio.address}, {purchase.datosEnvio.city},{" "}
                {purchase.datosEnvio.province}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileOrders;
