const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = require('./productController');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static('images'));

// Rutas usando el controlador
app.get('/products', getProducts);
app.get('/products/:id', getProductById);
app.post('/products', addProduct); 
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
