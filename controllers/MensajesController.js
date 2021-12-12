const Mensaje = require("../models/mensaje");

const obtenerChat = async (req, res) => {
  try {
    const miId = req.uid; // Para quien van los mensajes
    const mensajesDe = req.params.de; // De quien son los mensajes

    const ultimos30Mensajes = await Mensaje.find({
      $or: [
        //{ de: miId, para: mensajesDe },
        { de: mensajesDe, para: miId },
      ],
    })
      .sort({ createdAt: "desc" })
      .limit(30);
  } catch (error) {}
};

module.exports = {
  obtenerChat,
};
