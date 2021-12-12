class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");

      //validar el token de entrada

      // si el token  no es válido, desconectarlo

      // saber cual usuario está activo

      //emitir todos los usuarios conectados
      //unirme a una sala especifica de chat: Socket Join

      //escuchar cuando un cliente envia un mensjae

      //manejar el disconnect

      //marcar que el usuario se desconectó

      //emitir todos los usuarios conectados
    });
  }
}

module.exports = Sockets;
