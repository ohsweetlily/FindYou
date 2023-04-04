const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const AppError = require("../misc/AppError");
const errors = require("../misc/errors");
const bcrypt = require("bcrypt");

const authDAO = {
  async login({ email, password }) {
    const user = await prisma.User.findUniqueOrThrow({
      where: { email: email },
    })
      .then()
      .catch(() => {
        throw new AppError(
          errors.errorCodes.USER_EMAIL_ERROR,
          400,
          errors.errorMessages.USER_EMAIL_ERROR
        );
      });

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword)
      throw new AppError(
        errors.errorCodes.USER_PASSWORD_ERROR,
        400,
        errors.errorMessages.USER_PASSWORD_ERROR
      );

    return user;
  },
};
module.exports = authDAO;
