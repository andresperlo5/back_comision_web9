//productos
let productos = [
  {
    id: 1,
    nombre: "coca-cola",
    precio: 2500,
    descripcion: "la numero uno"
  }
]

const obtenerTodosLosProductosArray = () => {
  return {
    productos,
    statusCode: 200
  }
}

const obtenerUnProductoPorIdArray = (idProducto) => {
  const producto = productos.find((prod) => prod.id === Number(idProducto))

  if (!producto) {
    return {
      msg: "ERROR. Producto no existe",
      statusCode: 404
    }
  }

  return {
    producto,
    statusCode: 200
  }
}

const crearNuevoProductoArray = (body) => {
  const { nombre, precio, descripcion } = body

  const nuevoProducto = {
    id: productos[productos.length - 1]?.id + 1 || 1,
    nombre,
    precio,
    descripcion
  }

  productos.push(nuevoProducto)

  return {
    msg: "Producto creado con exito",
    statusCode: 201
  }
}

const actualizarProductoPorIdArray = (idProducto, body) => {
  const productoIndex = productos.findIndex((prod) => prod.id === Number(idProducto))

  if (productoIndex === -1) {
    return {
      msg: "ERROR. Producto no existe",
      statusCode: 404
    }
  }

  productos[productoIndex] = { id: Number(idProducto), ...body }

  return {
    msg: "Producto actualizado con exito",
    statusCode: 200
  }
}

const borrarUnProductoPorIdArray = (idProducto) => {
  const productoIndex = productos.findIndex((prod) => prod.id === Number(idProducto))

  if (productoIndex === -1) {
    return {
      msg: "ERROR. Producto no existe",
      statusCode: 404
    }
  }

  productos.splice(productoIndex, 1)

  return {
    msg: "Producto eliminado con exito",
    statusCode: 200
  }
}

module.exports = {
  obtenerTodosLosProductosArray,
  obtenerUnProductoPorIdArray,
  crearNuevoProductoArray,
  actualizarProductoPorIdArray,
  borrarUnProductoPorIdArray
}
