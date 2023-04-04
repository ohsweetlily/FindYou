const express = require("express");
const { userController } = require("../controller");
const { imageMiddleware, userMiddleware } = require("../middleware");

const userRouter = express.Router();

// 회원가입
userRouter.post(
  "/",
  userMiddleware.createCheckData("body"),
  userController.createUser
);

// 회원(개인)정보 조회
userRouter.get("/", userMiddleware.verifyUser, userController.indentifyUser);

// 회원(개인)정보 수정
userRouter.patch(
  "/",
  userMiddleware.verifyUser,
  imageMiddleware.upload.fields([
    { name: "image" },
    { name: "email" },
    { name: "password" },
    { name: "name" },
    { name: "displayName" },
    { name: "company" },
  ]),
  userMiddleware.editCheckData("body"),
  imageMiddleware.resizingUser,
  userController.editUser
);

// 회원(개인)정보 삭제
userRouter.delete("/", userMiddleware.verifyUser, userController.deleteUser);

// 회사 목록 가져오기
userRouter.get("/company", userController.listCompany);

module.exports = userRouter;
