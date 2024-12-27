const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Datos simulados
let products = [
  {
    id: 1,
    name: 'Proteína Whey',
    image: 'https://via.placeholder.com/150',
    subCategory: 'Suplementos',
    price: 50.0,
    info: 'Proteína de suero de leche ideal para ganar masa muscular.',
  },
  {
    id: 2,
    name: 'Mancuernas',
    image: 'https://via.placeholder.com/150',
    subCategory: 'Equipamiento',
    price: 25.0,
    info: 'Par de mancuernas de 5kg.',
  },
];

// Rutas
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  product ? res.json(product) : res.status(404).send('Producto no encontrado');
});

app.post('/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

app.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    products.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
