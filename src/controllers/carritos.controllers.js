const {
  agregarProductoCarritoBD,
  eliminarProductoCarritoBD,
  obtenerProductosDelCarritoBD,
} = require("../services/carritos.services");

const obtenerProductoDelCarrito = async (req, res) => {
  try {
    const { productos, statusCode, error } = await obtenerProductosDelCarritoBD(
      req.idCarrito
    );
    res.status(statusCode).json({ productos });
  } catch {
    res.status(statusCode).json({ error });
  }
};
const agregarProductoCarrito = async (req, res) => {
  const { msg, statusCode, error } = await agregarProductoCarritoBD(
    req.idCarrito,
    req.params.idProducto,
    req
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
    req.params.idProducto,
    req
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerProductoDelCarrito,
  agregarProductoCarrito,
  eliminarProductoCarrito,
};
