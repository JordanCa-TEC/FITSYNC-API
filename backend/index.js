const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static('images'));

// Datos simulados
let products = [
  {
    id: 1,
    name: 'Proteína Hidrolizada Hydrowhey 3.6lb – Optimum Nutrition',
    image: 'http://localhost:5000/images/product-hydro-fitsync.webp',
    subCategory: 'Proteínas',
    price: 365.90,
    info: 'Proteína de suero de leche ideal para ganar masa muscular.',
  },
  {
    id: 2,
    name: 'Amino-x EAAs 375g – BSN 375 gramos - Watermelon Smash',
    image: 'http://localhost:5000/images/amino_eaas-300x300.webp',
    subCategory: 'Aminoácidos',
    price: 139.90,
    info: 'Par de mancuernas de 5kg.',
  },
  {
    id: 3,
    name: 'BCAA 457g – Ultimate Nutrition',
    image: 'http://localhost:5000/images/bcaa_457_naranja-768x768.webp',
    subCategory: 'Aminoácidos',
    price: 189.90,
    info: 'Par de mancuernas de 5kg.',
  },
  {
    id: 4,
    name: 'Lipo 6 Black Intense UC – Nutrex',
    image: 'http://localhost:5000/images/PORTADA_LIPO_6_AMARILLO_NUTREX_NEW.webp',
    subCategory: 'Quemador de grasa',
    price: 169.90,
    info: 'Par de mancuernas de 5kg.',
  },
  {
    id: 5,
    name: 'Creatina Monohidratada 300gr – Ultimate Nutrition',
    image: 'http://localhost:5000/images/creatina_300g_un-768x768.webp',
    subCategory: 'Creatina',
    price: 129.90,
    info: 'Par de mancuernas de 5kg.',
  },
  {
    id: 6,
    name: 'Proteína aislada Nectar Medical 2lb – Syntrax',
    image: 'http://localhost:5000/images/NECTAR_SYNTRAX_2_LB-768x768.webp',
    subCategory: 'Proteínas aislada',
    price: 229.90,
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
