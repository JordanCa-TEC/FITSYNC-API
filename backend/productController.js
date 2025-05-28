const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

// Leer productos desde el archivo
const getProducts = (req, res) => {
    const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(products);
};

// Obtener un producto por ID
const getProductById = (req, res) => {
    const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
};

// Añadir un nuevo producto con texto largo
const addProduct = (req, res) => {
    const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const newProduct = req.body;
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    res.status(201).send('Producto añadido con éxito');
};

// Actualizar un producto existente
const updateProduct = (req, res) => {
    let products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const index = products.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
        res.send('Producto actualizado con éxito');
    } else {
        res.status(404).send('Producto no encontrado');
    }
};

// Eliminar un producto
const deleteProduct = (req, res) => {
    let products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const filteredProducts = products.filter(p => p.id != req.params.id);
    fs.writeFileSync(filePath, JSON.stringify(filteredProducts, null, 2));
    res.send('Producto eliminado con éxito');
};

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };
