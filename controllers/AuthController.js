const Usuario = require("../models/usuario");

const { request, response } = require("express");
const {
  encriptarPassword,
  comparePassword,
} = require("../helper/hashearPassword");
const { generarToken } = require("../helper/generarToken");

class AuthController {
  constructor() {}

  async crearUsuario(req, res) {
    try {
      const {
        body: { email, password, nombre },
      } = req;

      const existe = await Usuario.findOne({ email });

      if (existe) {
        return res
          .status(400)
          .json({ msg: "El usuario que intenta registrar ya existe" });
      }

      const usuario = new Usuario({ email, password, nombre });
      usuario.password = await encriptarPassword(password);
      await usuario.save();

      if (!usuario) {
        return res.status(422).json({
          msg: "No se pudo crear el nuevo usuario",
        });
      } else {
        const token = await generarToken(usuario);
        return res.status(201).json({
          usuario,
          token,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error interno del servidor. Se debe contactar al administrador",
      });
    }
  }

  async renovarToken(req, res) {
    try {
      const { uid } = req;
      const usuario = await Usuario.findById(uid);
      const token = await generarToken(usuario);
      return res.status(200).json({
        usuario,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error interno del servidor. Se debe contactar al administrador",
      });
    }
  }

  async autenticarUsuario(req, res) {
    try {
      const {
        body: { email, password },
      } = req;

      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        return res.status(404).json({ msg: "El usuario no existe" });
      }
      const coincide = await comparePassword(password, usuario.password);
      if (!coincide) {
        return res.status(400).json({
          msg: "Usuario o contraseña incorrectos",
        });
      }
      const token = await generarToken(usuario);
      return res.status(200).json({
        usuario,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error interno del servidor. Se debe contactar al administrador",
      });
    }
  }
}

module.exports = AuthController;
