const { Router } = require("express");
const router = Router();
const { validarJWT } = require("../middlware/validarToken");
const { obtenerChat } = require("../controllers/MensajesController");

module.exports = () => {
  router.get("/:de", validarJWT, obtenerChat);

  return router;
};
