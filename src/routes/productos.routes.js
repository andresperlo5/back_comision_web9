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
const { check } = require("express-validator");
const multerMiddlewares = require("../middlewares/multer.middlewares");
//rutas
//Obtener todos los productos
router.get("/", obtenerTodosProductos);
//Obtener un producto
router.get(
  "/:id",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  obtenrUnProducto
);
//Crear un producto
router.post(
  "/",
  multerMiddlewares.single("imagen"),
  /*   [
    nombre - precio - descripcion - imagen - 
    check("nombre", "ERROR. Campo NOMBRE esta vacio").notEmpty(),
    check("precio", "ERROR. Campo NOMBRE esta vacio").notEmpty(),
    check("descripcion", "ERROR. Campo NOMBRE esta vacio").notEmpty(),
    check("imagen", "ERROR. Campo NOMBRE esta vacio").notEmpty(),
  ],
  auth("admin"), */
  crearProducto
);
//Actualizar un producto
router.put(
  "/:id",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  auth("admin"),
  actualizarProducto
);
//Eliminar un producto
router.delete(
  "/:id",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  auth("admin"),
  borrarProducto
);

module.exports = router;
