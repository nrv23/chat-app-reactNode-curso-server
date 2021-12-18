const Mensaje = require("../models/mensaje");

const obtenerChat = async (req, res) => {
  try {
    const miId = req.uid; // Para quien van los mensajes
    const mensajesDe = req.params.de; // De quien son los mensajes

    const mensajes = await Mensaje.find({
      $or: [
        //{ de: miId, para: mensajesDe },
        { de: mensajesDe, para: miId },
        { de: miId, para: mensajesDe },
      ],
    })
      .sort({ createdAt: "asc" })
      .limit(30);

      res.status(200).json(mensajes)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno de servidor",
    });
  }
};

module.exports = {
  obtenerChat,
};
