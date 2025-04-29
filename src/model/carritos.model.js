const { Schema, model } = require("mongoose");

const CarritoSchema = new Schema({
  idUsuario: {
    type: String,
    trim: true,
  },
  productos: [],
});

const CarritosModel = model("carritos", CarritoSchema);
module.exports = CarritosModel;
