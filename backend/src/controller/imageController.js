const { imageService } = require("../service");
const fs = require("fs");
const AppError = require("../misc/AppError");
const errors = require("../misc/errors");

const imageController = {
  async find(req, res, next) {
    const { id } = req.user;
    const size = req.params.size;
    try {
      if (size == "origin") {
        const imageUrl = await imageService.originalFind({ id });
        fs.readFile(imageUrl, (err, data) => {
          if (err) throw new Error();
          res.end(data);
        });
      } else {
        const imageUrl = await imageService.resizingFind({ id, size });
        fs.readFile(imageUrl, (err, data) => {
          if (err) throw new Error();
          res.end(data);
        });
      }
    } catch (err) {
      next(
        new AppError(
          errors.errorCodes.IMAGE_SIZE_ERROR,
          400,
          errors.errorMessages.IMAGE_SIZE_ERROR
        )
      );
    }
  },
};
module.exports = imageController;
