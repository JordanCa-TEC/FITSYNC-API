const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const USERS_FILE = "./users.json";

// 📌 1️⃣ Asegurar que exista un usuario admin al iniciar
function ensureAdminExists() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(
      USERS_FILE,
      JSON.stringify([{ username: "admin", password: "admin123", role: "admin" }], null, 2)
    );
    console.log("✅ Usuario admin creado.");
  }
}

ensureAdminExists();

// 📌 2️⃣ Ruta para registrar usuarios (solo si no existen)
app.post("/auth/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
  }

  fs.readFile(USERS_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });

    let users = JSON.parse(data);

    if (users.find((user) => user.username === username)) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    users.push({ username, password, role: "user" });

    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error al guardar usuario" });
      res.json({ message: "Usuario registrado con éxito" });
    });
  });
});

// 📌 3️⃣ Ruta para iniciar sesión
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
  }

  fs.readFile(USERS_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });

    let users = JSON.parse(data);
    let user = users.find((user) => user.username === username && user.password === password);

    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    res.json({ message: "Inicio de sesión exitoso", user });
  });
});

// 📌 4️⃣ Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
