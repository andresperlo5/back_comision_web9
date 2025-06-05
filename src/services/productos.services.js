const { validationResult } = require("express-validator");
const ProductosModel = require("../model/productos.model");
const cloudinary = require("../helpers/cloudinary.config.helpers");

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

const obtenerUnProductoPorIdArray = async (idProducto, req) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return {
      msg: errorValidator.array(),
      statusCode: 422,
    };
  }

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

const crearNuevoProductoArray = async (body, req) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return {
      msg: errorValidator.array(),
      statusCode: 422,
    };
  }

  try {
    const nuevoProducto = new ProductosModel(body);
    /*    nuevoProducto.imagen = req.file.path;
    nuevoProducto.save(); */
    nuevoProducto.save();

    return {
      msg: "Producto creado con exito",
      statusCode: 201,
      idProducto: nuevoProducto._id,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const agregarImagenProductoArray = async (idProducto, file) => {
  const producto = await ProductosModel.findOne({ _id: idProducto });
  const imagen = await cloudinary.uploader.upload(file.path);
  producto.imagen = imagen.secure_url;
  await producto.save();

  return {
    msg: "imagen agrega al producto",
    statusCode: 200,
  };
};

const actualizarProductoPorIdArray = async (idProducto, body, req) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return {
      msg: errorValidator.array(),
      statusCode: 422,
    };
  }

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

const borrarUnProductoPorIdArray = async (idProducto, req) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return {
      msg: errorValidator.array(),
      statusCode: 422,
    };
  }

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
  agregarImagenProductoArray,
};
