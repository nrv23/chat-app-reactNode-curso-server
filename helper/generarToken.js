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

const comprobarJWT = (token = "") => {
  try {
    const { id } = jwt.verify(token, process.env.CLAVESECRETA);

    return [true, id];
  } catch (error) {
    console.log(error);
    return [false, null];
  }
};
module.exports = {
  generarToken,
  comprobarJWT,
};
