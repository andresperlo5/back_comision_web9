const { obtenerTodosLosProductosArray, obtenerUnProductoPorIdArray, crearNuevoProductoArray, actualizarProductoPorIdArray, borrarUnProductoPorIdArray } = require("../services/productos.services")

const obtenerTodosProductos = (req, res) => {
  const { productos, statusCode } = obtenerTodosLosProductosArray()
  res.status(statusCode).json({ productos })
}

const obtenrUnProducto = (req, res) => {
  //req - body - params - query
  const { producto, msg, statusCode } = obtenerUnProductoPorIdArray(req.params.id)
  res.status(statusCode).json(producto ? { producto } : { msg })
}

const crearProducto = (req, res) => {
  const { msg, statusCode } = crearNuevoProductoArray(req.body)
  res.status(statusCode).json({ msg })
}

const actualizarProducto = (req, res) => {
  const { msg, statusCode } = actualizarProductoPorIdArray(req.params.id, req.body)
  res.status(statusCode).json({ msg })
}

const borrarProducto = (req, res) => {
  const { msg, statusCode } = borrarUnProductoPorIdArray(req.params.id)
  res.status(statusCode).json({ msg })
}

module.exports = {
  obtenerTodosProductos,
  obtenrUnProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto
}
