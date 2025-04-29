const {
  obtenerTodosLosProductosArray,
  obtenerUnProductoPorIdArray,
  crearNuevoProductoArray,
  actualizarProductoPorIdArray,
  borrarUnProductoPorIdArray,
} = require("../services/productos.services");

const obtenerTodosProductos = async (req, res) => {
  const { productos, statusCode, error } =
    await obtenerTodosLosProductosArray();

  try {
    res.status(statusCode).json({ productos });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const obtenrUnProducto = async (req, res) => {
  const { producto, msg, statusCode } = await obtenerUnProductoPorIdArray(
    req.params.id
  );
  try {
    res.status(statusCode).json(producto ? { producto } : { msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const crearProducto = async (req, res) => {
  const { msg, statusCode, error } = await crearNuevoProductoArray(req.body);

  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const actualizarProducto = async (req, res) => {
  const { msg, statusCode, error } = await actualizarProductoPorIdArray(
    req.params.id,
    req.body
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const borrarProducto = async (req, res) => {
  const { msg, statusCode, error } = await borrarUnProductoPorIdArray(
    req.params.id
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerTodosProductos,
  obtenrUnProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
};
