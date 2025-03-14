const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;
const DATA_FILE = './users.json';

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Función para leer el archivo JSON
const readData = () => {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Función para escribir en el archivo JSON
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// 🔹 Ruta para registrar usuario
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Validar que todos los campos estén presentes
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const data = readData();

  // Verificar si el usuario ya existe
  if (data.users.some((user) => user.email === email)) {
    return res.status(400).json({ error: 'El usuario ya existe' });
  }

  // Agregar nuevo usuario
  const newUser = { id: Date.now(), username, email, password };
  data.users.push(newUser);
  writeData(data);

  res.status(201).json({ message: 'Usuario registrado', user: newUser });
});

// 🔹 Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const data = readData();

  const user = data.users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(400).json({ error: 'Credenciales incorrectas' });
  }

  res.json({ message: 'Login exitoso', user });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
