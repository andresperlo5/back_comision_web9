const { validationResult } = require("express-validator");

const validarFormato = (req) => {
  const errorValidator = validationResult(req);

  if (!errorValidator.isEmpty()) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  validarFormato,
};
