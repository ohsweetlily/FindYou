const { userService } = require("../service");
const bcrypt = require("bcrypt");
const AppError = require("../misc/AppError");
const errors = require("../misc/errors");

const userController = {
  async createUser(req, res, next) {
    const { email, name, password, displayName, company } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
      const user = company
        ? await userService.createCompanyUser({
            email,
            name,
            password: hashedPassword,
            displayName,
            company,
          })
        : await userService.createUser({
            email,
            name,
            password: hashedPassword,
            displayName,
          });
      res.json(user);
    } catch (err) {
      next(
        new AppError(
          errors.errorCodes.USER_SIGNUP_ERROR,
          400,
          errors.errorMessages.USER_SIGNUP_ERROR
        )
      );
    }
  },

  async indentifyUser(req, res, next) {
    const { id } = req.user;
    try {
      const user = await userService.identifyUser({ id });
      res.json(user);
    } catch (err) {
      next(
        new AppError(
          errors.errorCodes.USER_IDENTIFY_ERROR,
          400,
          errors.errorMessages.USER_IDENTIFY_ERROR
        )
      );
    }
  },

  async editUser(req, res, next) {
    const { id } = req.user;
    const { email, name, password, displayName, company } = req.body;
    const image =
      Object.keys(req.files).length !== 0 ? req.files.image[0].filename : null;
    const hashedPassword = password ? bcrypt.hashSync(password, 10) : password;
    try {
      const user = company
        ? await userService.editCompanyUser({
            id,
            email,
            name,
            password: hashedPassword,
            displayName,
            image,
            company,
          })
        : await userService.editUser({
            id,
            email,
            name,
            password: hashedPassword,
            displayName,
            image,
            company,
          });
      res.json(user);
    } catch (err) {
      next(
        new AppError(
          errors.errorCodes.USER_EDIT_ERROR,
          400,
          errors.errorMessages.USER_EDIT_ERROR
        )
      );
    }
  },

  async deleteUser(req, res, next) {
    const { id } = req.user;
    try {
      await userService.deleteUser({ id });
      res.json({ data: "회원 탈퇴가 완료되었습니다." });
    } catch (err) {
      next(
        new AppError(
          errors.errorCodes.USER_DELETE_ERROR,
          400,
          errors.errorMessages.USER_DELETE_ERROR
        )
      );
    }
  },

  async listCompany(req, res, next) {
    await userService
      .listCompany()
      .then((data) => res.json(data))
      .catch(() =>
        next(
          new AppError(
            errors.errorCodes.COMPANY_ERROR,
            400,
            errors.errorMessages.COMPANY_ERROR
          )
        )
      );
  },
};

module.exports = userController;
