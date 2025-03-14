const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const { register, login } = require("./authController"); // 🔹 Importa autenticación
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./productController"); // 🔹 Importa productos

const app = express();
const PORT = 5000;

// 📌 Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/images", express.static("images"));

// 📌 Asegurar usuario admin
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

// 📌 Rutas de autenticación usando `authController.js`
app.post("/auth/register", register);
app.post("/auth/login", login);

// 📌 Rutas de productos usando `productController.js`
app.get("/products", getProducts);
app.get("/products/:id", getProductById);
app.post("/products", addProduct);
app.put("/products/:id", updateProduct);
app.delete("/products/:id", deleteProduct);

// 📌 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
