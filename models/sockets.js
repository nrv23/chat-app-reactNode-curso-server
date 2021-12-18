const {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
  agregarMensaje
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

      this.io.emit("lista-usuarios", await getUsuarios());

      //unirme a una sala especifica de chat: Socket Join

      socket.join(id); // unir usuarios a una sala de chat. El nombre va ser propio de cada id y nunca va cambiar
      // cada vez que un usuario se conecta se une a una sala para luego al enviar un mensaje a otro usuario, unir ese otro usuario 
      // a la misma sala
    
      //escuchar cuando un cliente envia un mensjae
      socket.on('mensaje-personal', async (msg,cb) => {
        const nuevoMensaje = await agregarMensaje(msg);
        console.log(nuevoMensaje)
          if(nuevoMensaje) {
            //cb(msg);
            this.io.to(msg.para).emit('mensaje-personal',nuevoMensaje); // emitir la respuesta solamente en la sala de chat donde 
            //estan ubicados los usuarios
            this.io.to(msg.de).emit('mensaje-personal',nuevoMensaje)
          } else {
            //cb(null);
            this.io.to(msg.para).emit('mensaje-personal',null);

          } 

          //emitir respuesta 

          
      })
      //manejar el disconnect

      //marcar que el usuario se desconectó

      //emitir todos los usuarios conectados
      socket.on("disconnect", async () => {
        console.log("Cliente desconectado", id);
        await usuarioDesconectado(id);
        this.io.emit("lista-usuarios", await getUsuarios());
      });
    });
  }
}

module.exports = Sockets;
