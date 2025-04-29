const {
  agregarProductoCarritoBD,
  eliminarProductoCarritoBD,
} = require("../services/carritos.services");

const agregarProductoCarrito = async (req, res) => {
  const { msg, statusCode, error } = await agregarProductoCarritoBD(
    req.idCarrito,
    req.params.idProducto
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const eliminarProductoCarrito = async (req, res) => {
  const { msg, statusCode, error } = await eliminarProductoCarritoBD(
    req.idCarrito,
    req.params.idProducto
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  agregarProductoCarrito,
  eliminarProductoCarrito,
};
