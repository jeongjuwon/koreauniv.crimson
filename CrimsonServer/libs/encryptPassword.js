const bcrypt = require("bcryptjs");

function encryptPassword(password, salt) {
  return bcrypt.hashSync(password, salt);
}

module.exports = {
  encryptPassword,
};
