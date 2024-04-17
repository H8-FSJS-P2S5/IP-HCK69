const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  hashingPassword: (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },

  checkingPassword: (inputPassword, dbPassword) => {
    return bcrypt.compareSync(inputPassword, dbPassword);
  },

  signToken: (payload) => {
    return jwt.sign(payload, process.env.SECRET_TOKEN);
  },

  verifyToken: (token) => {
    return jwt.verify(token, process.env.SECRET_TOKEN);
  },
};
