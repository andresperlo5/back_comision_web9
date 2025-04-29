const { Router } = require("express");
const {
  eliminarProductoCarrito,
  agregarProductoCarrito,
} = require("../controllers/carritos.controllers");
const auth = require("../middlewares/auth");
const router = Router();

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
