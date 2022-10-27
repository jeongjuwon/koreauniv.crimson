const bcrypt = require("bcryptjs");

function encryptPassword(password, salt) {
  return bcrypt.hashSync(password, salt);
}

function matchPassword(plainPassword, encryptedPassword) {
  return bcrypt.compareSync(plainPassword, encryptedPassword);
}

module.exports = {
  encryptPassword,
  matchPassword,
};
