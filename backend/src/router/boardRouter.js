const express = require("express");
const { boardController } = require("../controller");
const {
  boardMiddleware,
  imageMiddleware,
  userMiddleware,
} = require("../middleware");

const boardRouter = express.Router();

// 찾아주세요 게시글 등록
boardRouter.post(
  "/",
  userMiddleware.verifyUser,
  imageMiddleware.upload.fields([
    { name: "image" },
    { name: "name" },
    { name: "description" },
    { name: "categoryName" },
    { name: "lostPlace" },
    { name: "lostDate" },
  ]),
  boardMiddleware.createCheckData("body"),
  boardController.createBoard
);

// 찾아주세요 게시글 조회(이름)
boardRouter.get("/", boardController.searchBoard);

// 찾아주세요 게시글 수정
boardRouter.patch(
  "/:id",
  userMiddleware.verifyUser,
  imageMiddleware.upload.fields([
    { name: "image" },
    { name: "name" },
    { name: "description" },
    { name: "categoryName" },
    { name: "lostPlace" },
    { name: "lostDate" },
  ]),
  boardMiddleware.editCheckData("body"),
  boardController.editBoard
);

// 찾아주세요 게시글 삭제
boardRouter.delete(
  "/:id",
  userMiddleware.verifyUser,
  boardController.deleteBoard
);

// 찾아주세요 게시글 상세 조회
boardRouter.get("/:id", boardController.findBoard);

module.exports = boardRouter;
