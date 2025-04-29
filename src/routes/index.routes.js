const { Router } = require("express");
const router = Router();

const carritosRoutes = require("./carritos.routes");
const productosRoutes = require("./productos.routes");
const usuariosRoutes = require("./usuarios.routes");
const serviciosRoutes = require("./servicios.routes");

router.use("/carritos", carritosRoutes);
router.use("/productos", productosRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/servicios", serviciosRoutes);

module.exports = router;
