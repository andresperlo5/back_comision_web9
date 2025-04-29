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
  const { usuario, statusCode, error } = await obtenerUnUsuariosPorIdBD(
    req.params.id
  );
  try {
    res.status(statusCode).json({ usuario });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const editarInfoUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await editarInfoUsuarioPorIdBD(
    req.params.id,
    req.body
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const altaLogicaUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await altaLogicaUsuarioPorIdBD(
    req.params.id
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const bajaLogicaUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await bajaLogicaUsuarioPorIdBD(
    req.params.id
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const bajaFisicaUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await bajaFisicaUsuarioPorIdBD(
    req.params.id
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const registroUsuario = async (req, res) => {
  const { msg, statusCode, error } = await registrarUsuarioBD(req.body);
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const iniciarSesionUsuario = async (req, res) => {
  const { msg, statusCode, token, error } = await iniciarSesionUsuarioDB(
    req.body
  );

  try {
    res.status(statusCode).json({ msg, token });
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
