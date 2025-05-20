const {
  registrarUsuarioBD,
  iniciarSesionUsuarioDB,
  obtenerTodosLosUsuariosBD,
  obtenerUnUsuariosPorIdBD,
  editarInfoUsuarioPorIdBD,
  altaLogicaUsuarioPorIdBD,
  bajaLogicaUsuarioPorIdBD,
  bajaFisicaUsuarioPorIdBD,
} = require("../services/usuarios.services");

const obtenerTodosLosUsuarios = async (req, res) => {
  const { usuarios, statusCode, error } = await obtenerTodosLosUsuariosBD();
  try {
    res.status(statusCode).json({ usuarios });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const obtenerUnUsuarioPorId = async (req, res) => {
  const { msg, usuario, statusCode, error } = await obtenerUnUsuariosPorIdBD(
    req.params.id,
    req
  );
  try {
    res.status(statusCode).json(msg ? { msg } : { usuario });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const editarInfoUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await editarInfoUsuarioPorIdBD(
    req.params.id,
    req.body,
    req
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const altaLogicaUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await altaLogicaUsuarioPorIdBD(
    req.params.id,
    req
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const bajaLogicaUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await bajaLogicaUsuarioPorIdBD(
    req.params.id,
    req
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const bajaFisicaUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await bajaFisicaUsuarioPorIdBD(
    req.params.id,
    req
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const registroUsuario = async (req, res) => {
  const { msg, statusCode, error } = await registrarUsuarioBD(req.body, req);
  try {
    res.status(statusCode).json({ msg, statusCode });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const iniciarSesionUsuario = async (req, res) => {
  const { msg, statusCode, token, error, rolUsuario } =
    await iniciarSesionUsuarioDB(req.body, req);

  try {
    res.status(statusCode).json({ msg, token, rolUsuario });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  editarInfoUsuarioPorId,
  altaLogicaUsuarioPorId,
  bajaLogicaUsuarioPorId,
  bajaFisicaUsuarioPorId,
  registroUsuario,
  iniciarSesionUsuario,
};
