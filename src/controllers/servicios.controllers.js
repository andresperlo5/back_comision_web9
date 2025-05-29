const mercadoPagoServices = require("../services/servicios.services");

const pagarProductosMP = async (req, res) => {
  const { statusCode, msg, responseMp } = await mercadoPagoServices();
  res.status(statusCode).json({ msg, responseMp });
};

module.exports = pagarProductosMP;
