const jwt = require("jsonwebtoken"); // generar token de sesion

const generarToken = (usuario) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: usuario._id.toString(),
      fecha: new Date().getTime(),
      nombre: usuario.nombre,
    };

    jwt.sign(
      payload,
      process.env.CLAVESECRETA,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarToken,
};
