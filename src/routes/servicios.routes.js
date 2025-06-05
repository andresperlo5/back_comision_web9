const express = require("express");
const {
  pagarProductosMP,
  recuperarContraseniaUsuario,
  cambiarContraseniaUsuario,
} = require("../controllers/servicios.controllers");
const router = express.Router();

//rutas
router.post("/pagoMercadoPago", pagarProductosMP);
router.post("/recoveryPass", recuperarContraseniaUsuario);
router.put("/changePassUser", cambiarContraseniaUsuario);

module.exports = router;
