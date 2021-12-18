const Usuario = require("../models/usuario");
const Mensaje = require("../models/mensaje");
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


const agregarMensaje = async msg => {

  try {
    

    const mensaje = new Mensaje(msg);
    const respuesta = await mensaje.save();

    if(respuesta) {
      return respuesta;
    } else {
      return null;
    }

  } catch (error) {
    console.log(error);
    return null;
  }
}
module.exports = {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
  agregarMensaje
};
