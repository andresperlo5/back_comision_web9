const mongoose = require("mongoose");

const ProductosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    lowerCase: true,
    trim: true,
    unique: true,
    maxLength: 50,
    minLength: 5,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    trim: true,
    required: true,
  },
  descripcion: {
    type: String,
    trim: true,
    required: true,
  },
  estado: {
    type: String,
    enum: ["habilitado", "deshabilitado"],
    trim: true,
    default: "deshabilitado",
  },
});

const ProductosModel = mongoose.model("productos", ProductosSchema);
module.exports = ProductosModel;
