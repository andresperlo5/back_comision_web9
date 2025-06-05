const UsuariosModel = require("../model/usuarios.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const CarritosModel = require("../model/carritos.model");
const FavoritosModel = require("../model/favoritos.model");
const { validationResult } = require("express-validator");
const { validarFormato } = require("../helpers/validator.helpers");
const { registroExitoso } = require("../utils/messages.nodemailer.utils");

const obtenerTodosLosUsuariosBD = async () => {
  try {
    const usuarios = await UsuariosModel.find();
    return {
      usuarios,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerUnUsuariosPorIdBD = async (idUsuario, req) => {
  const res = validarFormato(req);
  if (res) {
    return {
      msg: res.array(),
      statusCode: 422,
    };
  }

  try {
    const usuario = await UsuariosModel.findOne({ _id: idUsuario });
    return {
      usuario,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const editarInfoUsuarioPorIdBD = async (idUsuario, body) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return {
      msg: errorValidator.array(),
      statusCode: 422,
    };
  }

  try {
    await UsuariosModel.findByIdAndUpdate({ _id: idUsuario }, body);

    return {
      msg: "usuario editado con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const altaLogicaUsuarioPorIdBD = async (idUsuario, req) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return {
      msg: errorValidator.array(),
      statusCode: 422,
    };
  }

  try {
    const usuario = await UsuariosModel.findOne({ _id: idUsuario });
    usuario.estado = "habilitado";
    await usuario.save();

    return {
      msg: "usuario habilitado",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const bajaLogicaUsuarioPorIdBD = async (idUsuario) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return {
      msg: errorValidator.array(),
      statusCode: 422,
    };
  }

  try {
    const usuario = await UsuariosModel.findOne({ _id: idUsuario });
    usuario.estado = "deshabilitado";
    await usuario.save();

    return {
      msg: "usuario deshabilitado",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const bajaFisicaUsuarioPorIdBD = async (idUsuario) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return {
      msg: errorValidator.array(),
      statusCode: 422,
    };
  }

  try {
    const usuarioExiste = await UsuariosModel.findOne({ _id: idUsuario });

    if (!usuarioExiste) {
      return {
        msg: "ERROR. En el ID. El usuario no existe",
        statusCode: 404,
      };
    }

    await UsuariosModel.findByIdAndDelete({ _id: idUsuario });

    return {
      msg: "usuario borrado con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const registrarUsuarioBD = async (body, req) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return {
      msg: errorValidator.array(),
      statusCode: 422,
    };
  }

  try {
    const nuevoUsuario = new UsuariosModel(body);
    const nuevoCarrito = new CarritosModel({ idUsuario: nuevoUsuario._id });
    const nuevoFavoritos = new FavoritosModel({ idUsuario: nuevoUsuario._id });

    nuevoUsuario.contrasenia = await argon.hash(body.contrasenia);
    nuevoUsuario.idCarrito = nuevoCarrito._id;
    nuevoUsuario.idFavoritos = nuevoFavoritos._id;

    const { info, rejected } = await registroExitoso(
      nuevoUsuario.emailUsuario,
      nuevoUsuario.nombreUsuario
    );

    if (info && !rejected.length) {
      await nuevoCarrito.save();
      await nuevoFavoritos.save();
      await nuevoUsuario.save();

      return {
        msg: "Usuario registrado con exito",
        statusCode: 201,
      };
    } else {
      return {
        msg: "ERROR al intentar crear el usuario",
        statusCode: 422,
      };
    }
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const iniciarSesionUsuarioDB = async (body, req) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return {
      msg: errorValidator.array(),
      statusCode: 422,
    };
  }

  try {
    const usuarioExiste = await UsuariosModel.findOne({
      nombreUsuario: body.nombreUsuario,
    });

    if (!usuarioExiste) {
      return {
        msg: "usuario y/o contraseña incorrecto. USUARIO",
        statusCode: 409,
      };
    }

    if (usuarioExiste.estado === "deshabilitado") {
      return {
        msg: "Usuario bloqueado. Debes cominicarte con algun admin",
        statusCode: 400,
      };
    }

    const verificarContrasenia = await argon.verify(
      usuarioExiste.contrasenia,
      body.contrasenia
    );

    if (verificarContrasenia) {
      const payload = {
        idUsuario: usuarioExiste._id,
        idCarrito: usuarioExiste.idCarrito,
        idFavoritos: usuarioExiste.idFavoritos,
        rolUsuario: usuarioExiste.rol,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return {
        msg: "usuario logueado",
        token,
        rolUsuario: usuarioExiste.rol,
        statusCode: 200,
      };
    } else {
      return {
        msg: "usuario y/o contraseña incorrecto. CONTRASENIA",
        statusCode: 409,
      };
    }
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  obtenerTodosLosUsuariosBD,
  obtenerUnUsuariosPorIdBD,
  editarInfoUsuarioPorIdBD,
  altaLogicaUsuarioPorIdBD,
  bajaLogicaUsuarioPorIdBD,
  bajaFisicaUsuarioPorIdBD,
  registrarUsuarioBD,
  iniciarSesionUsuarioDB,
};
