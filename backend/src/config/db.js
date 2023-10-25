const mongoose = require('mongoose');

const dbUrl = 'mongodb://root:root123@localhost:27017/cloudArch';


const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error(`Error de conexión a la base de datos: ${error}`);
  }
};

module.exports = connectDB;
