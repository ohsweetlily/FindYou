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
    name: { type: "string", minLength: 2, maxLength: 15 },
    description: { type: "string" },
    categoryName: { type: "string" },
    area: { type: "string" },
    lostPlace: { type: "string" },
    status: { type: "string" },
    takePlace: { type: "string" },
    getDate: { type: "string", format: "date" },
  },
  required: [
    "name",
    "description",
    "categoryName",
    "area",
    "lostPlace",
    "takePlace",
    "getDate",
  ],
};

const editSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2, maxLength: 15 },
    description: { type: "string" },
    getDate: { type: "string", format: "date" },
    area: { type: "string" },
    lostPlace: { type: "string" },
    takePlace: { type: "string" },
    status: { type: "string" },
    categoryName: { type: "string" },
  },
};

const pickupSchema = {
  type: "object",
  properties: {
    status: { type: "string" },
    pickupDate: { type: "string", format: "date" },
  },
  required: ["status", "pickupDate"],
};

// create Validation Function
const createValidate = ajv.compile(createSchema);
const editValidate = ajv.compile(editSchema);
const pickupValidate = ajv.compile(pickupSchema);

const checkCreateData = (from) => (req, res, next) => {
  const data = req[from];
  if (createValidate(data)) {
    next();
  } else {
    fs.unlinkSync("uploads/" + req.file.filename);
    next(
      new AppError(
        errors.errorCodes.ITEM_CREATE_VALIDATION_ERROR,
        400,
        errors.errorMessages.ITEM_CREATE_VALIDATION_ERROR
      )
    );
  }
};

const checkEditData = (from) => (req, res, next) => {
  const data = req[from];
  if (editValidate(data)) {
    next();
  } else {
    if (Object.keys(req.files).length !== 0) {
      fs.unlinkSync("uploads/" + req.files.image[0].filename);
    }
    next(
      new AppError(
        errors.errorCodes.ITEM_EDIT_VALIDATION_ERROR,
        400,
        errors.errorMessages.ITEM_EDIT_VALIDATION_ERROR
      )
    );
  }
};

const checkPickupData = (from) => (req, res, next) => {
  const data = req[from];
  if (pickupValidate(data)) {
    next();
  } else {
    next(
      new AppError(
        errors.errorCodes.ITEM_PICKUP_VALIDATION_ERROR,
        400,
        errors.errorMessages.ITEM_PICKUP_VALIDATION_ERROR
      )
    );
  }
};

module.exports = {
  checkCreateData,
  checkEditData,
  checkPickupData,
};
