const express = require("express");
const {
  obtenerTodosProductos,
  obtenrUnProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

//rutas
//Obtener todos los productos
router.get("/", obtenerTodosProductos);
//Obtener un producto
router.get("/:id", obtenrUnProducto);
//Crear un producto
router.post("/", auth("admin"), crearProducto);
//Actualizar un producto
router.put("/:id", auth("admin"), actualizarProducto);
//Eliminar un producto
router.delete("/:id", auth("admin"), borrarProducto);

module.exports = router;
