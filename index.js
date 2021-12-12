const Server = require("./models/server");
require("dotenv").config({path:'.env'});
const server = new Server();
server.execute();
