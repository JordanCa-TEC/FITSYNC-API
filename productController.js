const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

// Función auxiliar para leer productos
const readProducts = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Función auxiliar para escribir productos
const writeProducts = (products) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
};

// Obtener todos los productos
const getProducts = (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al leer los productos.' });
  }
};

// Obtener un producto por ID
const getProductById = (req, res) => {
  try {
    const products = readProducts();
    const product = products.find((p) => p.id == req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el producto.' });
  }
};

// Añadir un nuevo producto
const addProduct = (req, res) => {
  try {
    const products = readProducts();
    const newProduct = req.body;

    // Validación básica
    if (!newProduct.id || !newProduct.name || !newProduct.price) {
      return res.status(400).json({ error: 'Faltan campos requeridos: id, name o price.' });
    }

    products.push(newProduct);
    writeProducts(products);

    res.status(201).json({ message: 'Producto añadido con éxito.', product: newProduct });
  } catch (err) {
    res.status(500).json({ error: 'Error al añadir el producto.' });
  }
};

// Actualizar un producto
const updateProduct = (req, res) => {
  try {
    let products = readProducts();
    const index = products.findIndex((p) => p.id == req.params.id);

    if (index !== -1) {
      products[index] = { ...products[index], ...req.body };
      writeProducts(products);
      res.json({ message: 'Producto actualizado con éxito.', product: products[index] });
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
};

// Eliminar un producto
const deleteProduct = (req, res) => {
  try {
    const products = readProducts();
    const filtered = products.filter((p) => p.id != req.params.id);

    if (products.length === filtered.length) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    writeProducts(filtered);
    res.json({ message: 'Producto eliminado con éxito.' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
