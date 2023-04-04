const AppError = require("../misc/AppError");
const errors = require("../misc/errors");
const fs = require("fs");
const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);

const createSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 15,
    },
    description: {
      type: "string",
    },
    categoryName: {
      type: "string",
    },
    lostPlace: {
      type: "string",
    },
    lostDate: {
      type: "string",
      format: "date",
    },
  },
  required: ["name", "description", "categoryName", "lostPlace", "lostDate"],
};

const editSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 15,
    },
    description: {
      type: "string",
    },
    categoryName: {
      type: "string",
    },
    lostPlace: {
      type: "string",
    },
    lostDate: {
      type: "string",
      format: "date",
    },
  },
};

const createValidate = ajv.compile(createSchema);
const editValidate = ajv.compile(editSchema);

const createCheckData = (from) => async (req, res, next) => {
  const data = req[from];
  if (createValidate(data)) {
    next();
  } else {
    next(
      new AppError(
        errors.errorCodes.BOARD_CREATE_VALIDATION_ERROR,
        400,
        errors.errorMessages.BOARD_CREATE_VALIDATION_ERROR
      )
    );
  }
};

const editCheckData = (from) => async (req, res, next) => {
  const data = req[from];
  if (editValidate(data)) {
    next();
  } else {
    if (Object.keys(req.files).length !== 0) {
      fs.unlinkSync("uploads/" + req.files.image[0].filename);
    }

    next(
      new AppError(
        errors.errorCodes.BOARD_EDIT_VALIDATION_ERROR,
        400,
        errors.errorMessages.BOARD_EDIT_VALIDATION_ERROR
      )
    );
  }
};

module.exports = {
  createCheckData,
  editCheckData,
};
