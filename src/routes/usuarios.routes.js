const express = require("express");
const {
  registroUsuario,
  iniciarSesionUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  editarInfoUsuarioPorId,
  altaLogicaUsuarioPorId,
  bajaLogicaUsuarioPorId,
  bajaFisicaUsuarioPorId,
} = require("../controllers/usuarios.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

//rutas
router.get("/", auth("admin"), obtenerTodosLosUsuarios);
router.get("/:id", auth("admin"), obtenerUnUsuarioPorId);

router.put("/:id", auth(["admin", "usuario"]), editarInfoUsuarioPorId);
router.put("/enabled/:id", auth("admin"), altaLogicaUsuarioPorId);
router.put("/disabled/:id", auth("admin"), bajaLogicaUsuarioPorId);

router.post("/register", registroUsuario);
router.post("/login", iniciarSesionUsuario);

router.delete("/:id", auth("admin"), bajaFisicaUsuarioPorId);

module.exports = router;
