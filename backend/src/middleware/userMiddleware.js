const AppError = require("../misc/AppError");
const errors = require("../misc/errors");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const regex = require("../misc/regex");
const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      pattern: regex.PASSWORD_PATTERN,
    },
  },
  required: ["email", "password"],
};

const createSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      pattern: regex.PASSWORD_PATTERN,
    },
    name: {
      type: "string",
      minLength: 2,
      maxLength: 15,
    },
    displayName: {
      type: "string",
      maxLength: 15,
    },
    company: {
      type: "string",
    },
  },
  required: ["email", "password", "name", "displayName"],
};

const editSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      pattern: regex.PASSWORD_PATTERN,
    },
    name: {
      type: "string",
      minLength: 2,
      maxLength: 15,
    },
    displayName: {
      type: "string",
      maxLength: 15,
    },
    company: {
      type: "string",
    },
  },
};

const loginValidate = ajv.compile(loginSchema);
const createValidate = ajv.compile(createSchema);
const editValidate = ajv.compile(editSchema);

const loginCheckData = (from) => async (req, res, next) => {
  const data = req[from];
  if (loginValidate(data)) {
    next();
  } else {
    next(
      new AppError(
        errors.errorCodes.USER_SIGNIN_VALIDATION_ERROR,
        400,
        errors.errorMessages.USER_SIGNIN_VALIDATION_ERROR
      )
    );
  }
};

const createCheckData = (from) => async (req, res, next) => {
  const data = req[from];
  if (createValidate(data)) {
    next();
  } else {
    next(
      new AppError(
        errors.errorCodes.USER_SIGNUP_VALIDATION_ERROR,
        400,
        errors.errorMessages.USER_SIGNUP_VALIDATION_ERROR
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
        errors.errorCodes.USER_EDIT_VALIDATION_ERROR,
        400,
        errors.errorMessages.USER_EDIT_VALIDATION_ERROR
      )
    );
  }
};

// 토큰 유효 검증
const verifyUser = (req, res, next) => {
  try {
    req.user = jwt.verify(req.cookies.token, process.env.SECRET);
  } catch (err) {
    next(
      new AppError(
        errors.errorCodes.JSONWEBTOKEN_ERROR,
        401,
        errors.errorMessages.JSONWEBTOKEN_ERROR
      )
    );
  }
  next();
};

module.exports = {
  verifyUser,
  loginCheckData,
  createCheckData,
  editCheckData,
};
