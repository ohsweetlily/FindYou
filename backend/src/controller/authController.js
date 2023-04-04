const { authService } = require("../service");
const AppError = require("../misc/AppError");
const errors = require("../misc/errors");
const commons = require("../misc/commons");

const authController = {
  async login(req, res, next) {
    const { email, password } = req.body;
    await authService
      .login({ email, password })
      .then((data) =>
        res
          .cookie("token", data.data, {
            maxAge: commons.COOKIE_MAX_AGE,
            httpOnly: true,
          })
          .json(data)
      )
      .catch((error) => next(error));
  },

  // 로그아웃
  async logout(req, res, next) {
    try {
      res.clearCookie("token").json({ data: "로그아웃되었습니다." });
    } catch (err) {
      next(
        new AppError(
          errors.errorCodes.USER_LOGOUT_ERROR,
          400,
          errors.errorMessages.USER_LOGOUT_ERROR
        )
      );
    }
  },
};
module.exports = authController;
