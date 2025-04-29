const ProductosModel = require("../model/productos.model");

const obtenerTodosLosProductosArray = async () => {
  try {
    const productos = await ProductosModel.find();
    return {
      productos,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerUnProductoPorIdArray = async (idProducto) => {
  try {
    const producto = await ProductosModel.findOne({ _id: idProducto });

    if (!producto) {
      return {
        msg: "ERROR. Producto no existe",
        statusCode: 404,
      };
    }

    return {
      producto,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const crearNuevoProductoArray = async (body) => {
  try {
    const nuevoProducto = new ProductosModel(body);
    await nuevoProducto.save();

    return {
      msg: "Producto creado con exito",
      statusCode: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const actualizarProductoPorIdArray = async (idProducto, body) => {
  try {
    await ProductosModel.findByIdAndUpdate({ _id: idProducto }, body);

    return {
      msg: "Producto actualizado con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const borrarUnProductoPorIdArray = async (idProducto) => {
  try {
    const producto = await ProductosModel.findOne({ _id: idProducto });

    if (!producto) {
      return {
        msg: "ERROR. Producto no existe",
        statusCode: 404,
      };
    }

    await ProductosModel.findByIdAndDelete({ _id: idProducto });

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
  obtenerTodosLosProductosArray,
  obtenerUnProductoPorIdArray,
  crearNuevoProductoArray,
  actualizarProductoPorIdArray,
  borrarUnProductoPorIdArray,
};
