const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
const trashRoutes = require('./routes/trashRoutes');
const directoryRoutes = require('./routes/directoryRoutes');
const userRoutes = require('./routes/userRoutes'); 

const app = express();
const PORT = process.env.PORT || 4000;

// Habilitar CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


// Conectar a la base de datos
connectDB();

app.use(express.json());

// Rutas de la app
app.use('/api/users', userRoutes);
app.use('/api/auth', require('./routes/login')); // Ruta de autenticación
app.use('/api/auth', require('./routes/register')); // Ruta de registro

// Rutas para los archivos, la papelera y los directorios
app.use('/api/files', fileRoutes);
app.use('/api/trash', trashRoutes);
app.use('/api/directories', directoryRoutes);
app.use('/trash', trashRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
