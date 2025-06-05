const { validationResult } = require("express-validator");
const CarritosModel = require("../model/carritos.model");
const ProductosModel = require("../model/productos.model");

const obtenerProductosDelCarritoBD = async (idCarrito) => {
  try {
    const carrito = await CarritosModel.findById(idCarrito);
    return {
      productos: carrito.productos,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const agregarProductoCarritoBD = async (idCarrito, idProducto, req) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return {
      msg: errorValidator.array(),
      statusCode: 422,
    };
  }

  try {
    const carrito = await CarritosModel.findOne({ _id: idCarrito });
    const producto = await ProductosModel.findOne({ _id: idProducto });

    const productoExisteCarrito = carrito.productos.find(
      (prod) => prod._id.toString() === idProducto.toString()
    );

    if (productoExisteCarrito) {
      return {
        msg: "Producto ya existe en el carrito",
        statusCode: 400,
      };
    }

    carrito.productos.push(producto);
    await carrito.save();

    return {
      msg: "Producto agregado correctamente",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const eliminarProductoCarritoBD = async (idCarrito, idProducto, req) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return {
      msg: errorValidator.array(),
      statusCode: 422,
    };
  }

  try {
    const carrito = await CarritosModel.findOne({ _id: idCarrito });
    const productoIndex = carrito.productos.findIndex(
      (prod) => prod._id.toString() === idProducto.toString()
    );

    if (productoIndex < 0) {
      return {
        msg: "ERROR ID: no existe el producto que buscas",
        statusCode: 404,
      };
    }

    carrito.productos.splice(productoIndex, 1);

    await carrito.save();

    return {
      msg: "Producto eliminado con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  obtenerProductosDelCarritoBD,
  agregarProductoCarritoBD,
  eliminarProductoCarritoBD,
};
