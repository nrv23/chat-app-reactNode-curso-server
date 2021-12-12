const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const AuthController = require("../controllers/AuthController");
const { validarCampos } = require("../middlware/validarCampos");
const { validarJWT } = require("../middlware/validarToken");
const auth = new AuthController();
const { crearUsuario, renovarToken, autenticarUsuario } = auth;

module.exports = () => {
  router.post(
    "/new",
    [
      check("email", "El email es requerido").isEmail(),
      check(
        "password",
        "La contraseña debe tener al menos 6 caracteres"
      ).isLength({ min: 6 }),
      check(
        "nombre",
        "El nombre de usuario debe tener al menos 6 caracteres"
      ).isLength({ min: 6 }),
      validarCampos, // le pasa los parametros de req y res por referencia en el express-validator
    ],
    crearUsuario
  );
  router.post(
    "/",
    [
      check("email", "El email es requerido").isEmail(),
      check(
        "password",
        "La contraseña debe tener al menos 6 caractéres"
      ).isLength({ min: 6 }),
      validarCampos, // le pasa los parametros de req y res por referencia en el express-validator
    ],
    autenticarUsuario
  );
  router.get("/renew-token", validarJWT, renovarToken);

  return router;
};
