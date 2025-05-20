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
const { check } = require("express-validator");

//rutas
router.get("/", auth("admin"), obtenerTodosLosUsuarios);
router.get(
  "/:id",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],

  obtenerUnUsuarioPorId
);

router.put(
  "/:id",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  auth(["admin", "usuario"]),
  editarInfoUsuarioPorId
);
router.put(
  "/enabled/:id",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  auth("admin"),
  altaLogicaUsuarioPorId
);
router.put(
  "/disabled/:id",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  auth("admin"),
  bajaLogicaUsuarioPorId
);

router.post(
  "/register",
  [
    check("nombreUsuario", "Campo USUARIO esta vacio").notEmpty(),
    check(
      "nombreUsuario",
      "ERROR. Caracteres soportados solo entre 5 y 40"
    ).isLength({ min: 5 }, { max: 40 }),
    check("emailUsuario", "Campo EMAIL vacio").notEmpty(),
    check("emailUsuario", "ERROR. Formato incorrecto").isEmail(),
    check("contrasenia", "Campo CONTRASEÑA vacio").notEmpty(),
    check(
      "contrasenia",
      "ERROR. Caracteres soportados solo entre 8 y 40"
    ).isLength({ min: 8 }, { max: 40 }),
  ],
  registroUsuario
);
router.post(
  "/login",
  [
    check("nombreUsuario", "Campo USUARIO esta vacio").notEmpty(),
    check("contrasenia", "Campo CONTRASEÑA vacio").notEmpty(),
    check(
      "contrasenia",
      "ERROR. Caracteres soportados solo entre 8 y 40"
    ).isLength({ min: 8 }, { max: 40 }),
  ],
  iniciarSesionUsuario
);

router.delete(
  "/:id",
  [check("id", "ID incorrecto. Formato no corresponde a mongoose").isMongoId()],
  auth("admin"),
  bajaFisicaUsuarioPorId
);

module.exports = router;
