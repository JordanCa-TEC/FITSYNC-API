const fs = require("fs");
const path = require("path");

const purchasesPath = path.join(__dirname, "purchases.json");

const readPurchases = () => {
  const data = fs.readFileSync(purchasesPath, "utf-8");
  return JSON.parse(data);
};

const getPurchasesByUser = (req, res) => {
  try {
    const allPurchases = readPurchases();
    const userId = req.params.userId;

    const userPurchases = allPurchases.filter(
      (purchase) => purchase.userId === userId
    );

    res.json(userPurchases);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las compras del usuario." });
  }
};

module.exports = {
  getPurchasesByUser
};
