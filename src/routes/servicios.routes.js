const express = require("express");
const {
  pagarProductosMP,
  recuperarContraseniaUsuario,
  cambiarContraseniaUsuario,
} = require("../controllers/servicios.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

//rutas
router.post("/pagoMercadoPago", auth("usuario"), pagarProductosMP);
router.post("/recoveryPass", recuperarContraseniaUsuario);
router.put("/changePassUser", cambiarContraseniaUsuario);

module.exports = router;
