const express = require("express");
const { authController } = require("../controller");
const { userMiddleware } = require("../middleware");

const authRouter = express.Router();

// 로그인
authRouter.post(
  "/sign-in",
  userMiddleware.loginCheckData("body"),
  authController.login
);

// 로그아웃
authRouter.post("/sign-out", authController.logout);

module.exports = authRouter;
