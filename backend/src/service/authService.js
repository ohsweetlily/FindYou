const { authDAO } = require("../data-access");
const jwt = require("jsonwebtoken");
const commons = require("../misc/commons");
const authService = {
  async login({ email, password }) {
    const user = await authDAO.login({ email, password });
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: commons.TOKEN_EXPIRES_IN,
    });
    return { data: token };
  },
};
module.exports = authService;
