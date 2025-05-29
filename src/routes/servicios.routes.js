const express = require("express");
const pagarProductosMP = require("../controllers/servicios.controllers");
const router = express.Router();

//rutas
router.post("/", pagarProductosMP);

module.exports = router;
