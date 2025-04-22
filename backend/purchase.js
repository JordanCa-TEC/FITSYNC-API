// purchase.js
const fs = require("fs");
const path = require("path");

const PURCHASES_FILE = path.join(__dirname, "purchases.json");

// Leer compras desde el archivo
const readPurchases = () => {
  if (!fs.existsSync(PURCHASES_FILE)) {
    fs.writeFileSync(PURCHASES_FILE, "[]"); // Crear si no existe
  }
  const data = fs.readFileSync(PURCHASES_FILE, "utf-8");
  return JSON.parse(data);
};

// Escribir compras al archivo
const writePurchases = (purchases) => {
  fs.writeFileSync(PURCHASES_FILE, JSON.stringify(purchases, null, 2));
};

// Obtener compras de un usuario
const getPurchasesByUser = (req, res) => {
  try {
    const userId = req.params.userId;
    const purchases = readPurchases();
    const userPurchases = purchases.filter((p) => p.userId == userId);
    res.json(userPurchases);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las compras del usuario." });
  }
};

// Agregar una nueva compra
const addPurchase = (req, res) => {
  try {
    const newPurchase = req.body;

    if (!newPurchase.userId || !newPurchase.items || !Array.isArray(newPurchase.items)) {
      return res.status(400).json({ error: "Datos inválidos para la compra." });
    }

    const purchases = readPurchases();
    const newEntry = {
      id: Date.now().toString(),
      ...newPurchase,
      date: new Date().toISOString()
    };

    purchases.push(newEntry);
    writePurchases(purchases);

    res.status(201).json({ message: "Compra registrada con éxito", purchase: newEntry });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar la compra." });
  }
};

module.exports = {
  getPurchasesByUser,
  addPurchase
};
