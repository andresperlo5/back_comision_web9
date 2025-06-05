const {
  mercadoPagoServices,
  recoveryPassUserServices,
  changePassUserServices,
} = require("../services/servicios.services");

const pagarProductosMP = async (req, res) => {
  const { statusCode, msg, responseMp } = await mercadoPagoServices();
  res.status(statusCode).json({ msg, responseMp });
};

const recuperarContraseniaUsuario = async (req, res) => {
  const { msg, statusCode, error } = await recoveryPassUserServices(
    req.body.emailUsuario
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const cambiarContraseniaUsuario = async (req, res) => {
  const token = req.header("auth");
  const { msg, statusCode, error } = await changePassUserServices(
    token,
    req.body.nuevaContrasenia
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  pagarProductosMP,
  recuperarContraseniaUsuario,
  cambiarContraseniaUsuario,
};
