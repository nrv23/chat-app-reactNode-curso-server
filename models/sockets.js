const {
  usuarioConectado,
  usuarioDesconectado,
} = require("../controllers/SocketController");
const { comprobarJWT } = require("../helper/generarToken");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", async (socket) => {
      // leer el token que viene por el socket

      const token = socket.handshake.query["x-token"];
      const [valido, id] = comprobarJWT(token);

      if (!valido) {
        console.log("Socket no identificado");
        return socket.disconnect(); // desconectar el socket si el token no es valido
      }

      console.log("Cliente conectado", id);
      await usuarioConectado(id);

      //validar el token de entrada

      // si el token  no es válido, desconectarlo

      // saber cual usuario está activo

      //emitir todos los usuarios conectados
      //unirme a una sala especifica de chat: Socket Join

      //escuchar cuando un cliente envia un mensjae

      //manejar el disconnect

      //marcar que el usuario se desconectó

      //emitir todos los usuarios conectados
      socket.on("disconnect", async () => {
        console.log("Cliente desconectado", id);
        await usuarioDesconectado(id);
      });
    });
  }
}

module.exports = Sockets;
