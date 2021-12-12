const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const Sockets = require("./sockets");
const cors = require("cors");
const connDB = require("../config/Db");
//rutas
const auth = require("../routes/auth");
const mensajes = require("../routes/mensajes");

class Server {
  constructor() {
    this.app = express(); // instancia de un nuevo servidor de express
    this.port = process.env.PORT || 8080;
    this.server = http.createServer(this.app); // crear un servidor de express
    connDB();
    //configuración de sockets
    this.io = socketio(this.server, {
      /*Confirueaciones del socket*/
    }); // configurar el socket server que va conectado con express
  }

  configureSocket() {
    new Sockets(this.io);
  }
  middlewares() {
    //directorio publico
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use(express.static(path.resolve(__dirname, "../public")));
    //cargar rutas
    this.app.use("/api/auth", auth());
    this.app.use("/api/mensajes", mensajes());
  }
  execute() {
    this.middlewares();
    this.configureSocket();
    this.server.listen(this.port, () => {
      console.log(`Escuchando peticiones en puerto ${this.port}`);
    });
  }
}

module.exports = Server;
