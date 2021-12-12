const { response, request } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req = request, res = response, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    //vienen errores de validacion

    return res.status(422).json({
      data: {
        errores: errores.mapped(),
      },
    });
  }
  next(); // si pasa la validacion entonces pasa al siguiente middleware
};

module.exports = {
  validarCampos,
};
