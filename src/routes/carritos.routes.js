const { Router } = require("express");
const {
  eliminarProductoCarrito,
  agregarProductoCarrito,
} = require("../controllers/carritos.controllers");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const router = Router();

router.put(
  "/agregarProducto/:idProducto",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  auth("usuario"),
  agregarProductoCarrito
);
router.put(
  "/eliminarUnProducto/:idProducto",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  auth("usuario"),
  eliminarProductoCarrito
);

module.exports = router;
