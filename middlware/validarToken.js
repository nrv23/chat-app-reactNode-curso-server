const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");
    console.log(token);
    if (!token) {
      return res.status(401).json({
        msg: "Sesión inválida",
      });
    }

    const { id } = jwt.verify(token, process.env.CLAVESECRETA);
    //asignar uid de usuario por si se necesita volver a generar el token
    req.uid = id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token inválido",
    });
  }
};

module.exports = {
  validarJWT,
};
