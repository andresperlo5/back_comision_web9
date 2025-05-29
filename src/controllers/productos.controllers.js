const {
  obtenerTodosLosProductosArray,
  obtenerUnProductoPorIdArray,
  crearNuevoProductoArray,
  actualizarProductoPorIdArray,
  borrarUnProductoPorIdArray,
  agregarImagenProductoArray,
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
    req.params.id,
    req
  );
  try {
    res.status(statusCode).json(producto ? { producto } : { msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const crearProducto = async (req, res) => {
  console.log(req.body);
  const { msg, statusCode, error, idProducto } = await crearNuevoProductoArray(
    req.body,
    req
  );

  try {
    res.status(statusCode).json({ msg, idProducto });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const agregarImagenProducto = async (req, res) => {
  const { statusCode, msg } = await agregarImagenProductoArray(
    req.params.id,
    req.file
  );
  res.status(statusCode).json(msg);
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
    req.params.id,
    req
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
  agregarImagenProducto,
};
