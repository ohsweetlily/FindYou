const AppError = require("../misc/AppError");
const errors = require("../misc/errors");
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");

const transformUser = [
  { name: "small", width: 48, height: 48 },
  { name: "large", width: 120, height: 120 },
];

const transformItem = { name: "medium", width: 96, height: 96 };

const allowedExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".bmp",
  ".JPG",
  ".PNG",
  ".JPEG",
  ".SVG",
  ".svg",
  ".apng",
  ".APNG",
  ".gif",
  ".GIF",
];
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return cb(
          new AppError(
            errors.errorCodes.IMAGE_EXTENSION_ERROR,
            400,
            errors.errorMessages.IMAGE_EXTENSION_ERROR
          )
        );
      }
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 4 * 1024 * 1024 },
});

const resizingUser = async (req, res, next) => {
  if (Object.keys(req.files).length !== 0) {
    await Promise.all(
      transformUser.map((item) => {
        sharp("uploads/" + req.files.image[0].filename)
          .resize({
            width: item.width,
            height: item.height,
          })
          .withMetadata()
          .toFile(
            `uploads/${item.name}/${req.files.image[0].filename}`,
            (err, info) => {
              if (err)
                throw new AppError(
                  errors.errorCodes.IMAGE_RESIZING_ERROR,
                  400,
                  errors.errorMessages.IMAGE_RESIZING_ERROR
                );
            }
          );
      })
    );
  }
  next();
};

const resizingItem = async (req, res, next) => {
  sharp("uploads/" + req.files.image[0].filename)
    .resize({
      width: transformItem.width,
      height: transformItem.height,
    })
    .withMetadata()
    .toFile(
      `uploads/${transformItem.name}/${req.files.image[0].filename}`,
      (err, info) => {
        if (err)
          throw new AppError(
            errors.errorCodes.IMAGE_RESIZING_ERROR,
            400,
            errors.errorMessages.IMAGE_RESIZING_ERROR
          );
      }
    );
  next();
};

const resizingEditItem = async (req, res, next) => {
  if (Object.keys(req.files).length !== 0) {
    sharp("uploads/" + req.files.image[0].filename)
      .resize({
        width: transformItem.width,
        height: transformItem.height,
      })
      .withMetadata()
      .toFile(
        `uploads/${transformItem.name}/${req.files.image[0].filename}`,
        (err, info) => {
          if (err)
            throw new AppError(
              errors.errorCodes.IMAGE_RESIZING_ERROR,
              400,
              errors.errorMessages.IMAGE_RESIZING_ERROR
            );
        }
      );
  }
  next();
};

module.exports = {
  upload,
  resizingUser,
  resizingItem,
  resizingEditItem,
};
