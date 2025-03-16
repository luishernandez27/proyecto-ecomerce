const express = require('express');
const { Carrito, Producto } = require('../models');
const auth = require('../middlewares/auth'); // Middleware para proteger rutas

const router = express.Router();

// Obtener el carrito del usuario autenticado
router.get('/', auth, async (req, res) => {
    try {
        const carrito = await Carrito.findAll({
            where: { usuario_id: req.usuario.id },
            include: [{ model: Producto }]
        });
        res.json(carrito);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el carrito", error });
    }
});

// Agregar producto al carrito
router.post('/', auth, async (req, res) => {
    try {
        const { producto_id, cantidad } = req.body;

        // Verificar si el producto existe
        const producto = await Producto.findByPk(producto_id);
        if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

        // Agregar al carrito
        const itemCarrito = await Carrito.create({
            usuario_id: req.usuario.id,
            producto_id,
            cantidad
        });

        res.status(201).json({ mensaje: "Producto agregado al carrito", itemCarrito });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al agregar al carrito", error });
    }
});

// 🔹 ELIMINAR UN PRODUCTO DEL CARRITO POR ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const itemCarrito = await Carrito.findOne({
            where: { id, usuario_id: req.usuario.id }
        });

        if (!itemCarrito) {
            return res.status(404).json({ mensaje: "Producto no encontrado en el carrito" });
        }

        await itemCarrito.destroy();
        res.json({ mensaje: "Producto eliminado del carrito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el producto del carrito", error });
    }
});

// 🔹 VACIAR COMPLETAMENTE EL CARRITO DEL USUARIO
router.delete('/', auth, async (req, res) => {
    try {
        await Carrito.destroy({ where: { usuario_id: req.usuario.id } });
        res.json({ mensaje: "Carrito vaciado exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al vaciar el carrito", error });
    }
});

module.exports = router;
