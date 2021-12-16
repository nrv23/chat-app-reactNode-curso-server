const Usuario = require("../models/usuario");

const usuarioConectado = async (id) => {
  try {
    const usuario = await Usuario.findById(id);
    usuario.Online = true;
    await usuario.save();

    return usuario;
  } catch (error) {
    return error;
  }
};

const usuarioDesconectado = async (id) => {
  try {
    const usuario = await Usuario.findById(id);
    usuario.Online = false;
    await usuario.save();

    return usuario;
  } catch (error) {
    return error;
  }
};

const getUsuarios = async () => {
  try {
    const usuarios = await Usuario.find().sort("-Online");

    return usuarios;
  } catch (error) {
    return error;
  }
};

module.exports = {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
};
