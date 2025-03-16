const express = require('express');
const router = express.Router();
const db = require('../models'); // Importa la base de datos
const Producto = db.Producto;   // Accede al modelo Producto

// Obtener todos los productos (GET /api/products)
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json({ productos });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
});

// Crear un nuevo producto (POST /api/products)
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, stock } = req.body;
    const nuevoProducto = await Producto.create({
      nombre, descripcion, precio, imagen, stock
    });
    res.status(201).json({ mensaje: 'Producto creado', producto: nuevoProducto });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ mensaje: 'Error al crear producto' });
  }
});

module.exports = router;
