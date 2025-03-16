require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const sequelize = require('./models').sequelize; // Conexión a la base de datos

// Importar rutas
const usuariosRoutes = require('./routes/usuarios.routes');
const productosRoutes = require('./routes/productos.routes');
const carritoRoutes = require('./routes/carrito.routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


sequelize.authenticate()
    .then(() => {
        console.log("Base de datos conectada correctamente.");
    })
    .catch(err => {
        console.error("Error al conectar a la base de datos:", err);
    });

// Rutas principales
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/cart', carritoRoutes);

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente 🚀');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
