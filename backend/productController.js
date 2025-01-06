const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');
let products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const saveProductsToFile = () => {
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};

// Obtener todos los productos
const getProducts = (req, res) => {
    res.json(products);
};

// Obtener un producto por ID
const getProductById = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    product ? res.json(product) : res.status(404).send('Producto no encontrado');
};

// Agregar un nuevo producto
const addProduct = (req, res) => {
    const { name, image, subCategory, price, info } = req.body;

    // Asegúrate de que la descripción no esté vacía y sea una cadena de texto
    if (typeof info !== 'string' || info.length === 0) {
        return res.status(400).json({ error: 'La descripción (info) debe ser un texto válido.' });
    }

    const newProduct = { id: products.length + 1, name, image, subCategory, price, info };
    products.push(newProduct);
    saveProductsToFile();
    res.status(201).json(newProduct);
};

// Actualizar un producto
const updateProduct = (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        saveProductsToFile();
        res.json(products[index]);
    } else {
        res.status(404).send('Producto no encontrado');
    }
};

// Eliminar un producto
const deleteProduct = (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        products.splice(index, 1);
        saveProductsToFile();
        res.sendStatus(204);
    } else {
        res.status(404).send('Producto no encontrado');
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
