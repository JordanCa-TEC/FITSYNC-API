import { useSelector } from "react-redux";

const ProfileOrders = () => {
  const purchases = useSelector((state) => state.purchases.items);
  const baseUrl = process.env.REACT_APP_API_URL;

  console.log("Base URL:", baseUrl);
  console.log("Purchases:", purchases);

  // Imagen fallback (puedes cambiar a cualquier URL válida)
  const fallbackImage = "https://via.placeholder.com/80?text=No+Image";

  return (
    <div className="profile__orders">
      <h2>Mis Compras</h2>
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase.id || Math.random()}>
            <p>
              <strong>Fecha:</strong>{" "}
              {typeof purchase.fecha === "string"
                ? purchase.fecha
                : JSON.stringify(purchase.fecha)}
            </p>

            <p>
              <strong>Total:</strong> s/. {purchase.total || "0.00"}
            </p>

            <p>
              <strong>Productos:</strong> {purchase.productos?.length || 0}
            </p>

            <ul>
              {purchase.productos?.map((item, index) => {
                const imageUrl = item?.image
                  ? `${baseUrl}/${item.image}`
                  : fallbackImage;

                return (
                  <li key={item.id || index} >
                    <img
                      src={imageUrl}
                      alt={item.name || "Producto"}
                      onError={(e) => {
                        console.error("Error cargando imagen:", imageUrl);
                        e.target.src = fallbackImage;
                      }}
                    />
                    <div>
                      <span>{item.name || "Sin nombre"}</span> <br />
                      <span>Cantidad: {item.quantity || 0}</span> <br />
                      <span className="price">
                        Total: s/.{" "}
                        {item.price && item.quantity
                          ? (item.price * item.quantity).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            {purchase.datosEnvio &&
              typeof purchase.datosEnvio === "object" && (
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
