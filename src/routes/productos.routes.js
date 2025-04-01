const express = require('express')
const { obtenerTodosProductos, obtenrUnProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controllers')
const router = express.Router()

//rutas
//Obtener todos los productos
router.get('/', obtenerTodosProductos)
//Obtener un producto
router.get('/:id', obtenrUnProducto)
//Crear un producto
router.post('/', crearProducto)
//Actualizar un producto
router.put('/:id', actualizarProducto)
//Eliminar un producto
router.delete('/:id', borrarProducto)

module.exports = router
