const express = require('express');
const connectDB = require('./config/db');
const routes = require('./controllers/userController');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
const trashRoutes = require('./routes/trashRoutes');
const directoryRoutes = require('./routes/directoryRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Habilitar CORS
app.use(cors());

// Conectar a la base de datos
connectDB();

app.use(express.json());

// Rutas de la app
app.use('/', routes);
app.use('/api/auth', require('./routes/login')); // Ruta de autenticación
app.use('/api/auth', require('./routes/register')); // Ruta de registro

// Rutas para los archivos, la papelera y los directorios
app.use('/api/files', fileRoutes);
app.use('/api/trash', trashRoutes);
app.use('/api/directories', directoryRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
