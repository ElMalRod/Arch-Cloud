const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Habilitar CORS - Colócalo al principio
app.use(cors());

// Conectar a la base de datos
connectDB();

app.use(express.json());

// Rutas de la app
app.use('/', routes);
app.use('/api/auth', require('./routes/login')); // Ruta de autenticación
app.use('/api/auth', require('./routes/register')); // Ruta de registro

// Login

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
