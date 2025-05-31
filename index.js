const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const { getPurchasesByUser, addPurchase } = require("./purchase");
const { register, login } = require("./authController");
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./productController");

const app = express();

// ⚠️ CAMBIO IMPORTANTE: usar el puerto que da el servidor online
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/images", express.static("images"));

// Crear usuario admin si no existe
const USERS_FILE = "./users.json";
function ensureAdminExists() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(
      USERS_FILE,
      JSON.stringify(
        [{ username: "admin", password: "admin123", role: "admin" }],
        null,
        2
      )
    );
    console.log("✅ Usuario admin creado.");
  }
}
ensureAdminExists();

// Rutas de autenticación
app.post("/auth/register", register);
app.post("/auth/login", login);

// Rutas de productos
app.get("/products", getProducts);
app.get("/products/:id", getProductById);
app.post("/products", addProduct);
app.put("/products/:id", updateProduct);
app.delete("/products/:id", deleteProduct);
app.get("/purchases/:userId", getPurchasesByUser);
app.post("/purchases", addPurchase);

// Ruta para ver todos los usuarios
app.get("/users", (req, res) => {
  fs.readFile(USERS_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error al leer users.json:", err);
      return res.status(500).json({ message: "Error al leer el archivo de usuarios" });
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

// ⚠️ CAMBIO IMPORTANTE: inicia el servidor con el puerto dinámico
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
