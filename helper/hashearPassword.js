const bcrypt = require("bcryptjs");

const genPassword = (salt, pass) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(salt, function (err, salt) {
      if (err) return reject(err);
      bcrypt.hash(pass, salt, function (err, hash) {
        if (err) return reject(err);

        return resolve(hash);
        // Store hash in your password DB.
      });
    });
  });
};

const comparePassword = async (password, hash) => {
  return new Promise((resolve, reject) => {
    const salt = 10;

    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const encriptarPassword = async (password) => {
  const salt = 10; // cantidad de vueltas para encriptar la contraseña
  return await genPassword(salt, password);
  salt, password;
};

module.exports = {
  encriptarPassword,
  comparePassword,
};
