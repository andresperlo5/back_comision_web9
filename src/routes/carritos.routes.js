const { Router } = require("express");
const {
  eliminarProductoCarrito,
  agregarProductoCarrito,
  obtenerProductoDelCarrito,
} = require("../controllers/carritos.controllers");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const router = Router();

router.get("/", auth("usuario"), obtenerProductoDelCarrito);

router.put(
  "/agregarProducto/:idProducto",
  auth("usuario"),
  agregarProductoCarrito
);
router.put(
  "/eliminarUnProducto/:idProducto",
  auth("usuario"),
  eliminarProductoCarrito
);

module.exports = router;
