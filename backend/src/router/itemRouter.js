const express = require("express");
const { itemController } = require("../controller");
const {
  imageMiddleware,
  itemMiddleware,
  userMiddleware,
} = require("../middleware");

const itemRouter = express.Router();

// 분실물 등록
itemRouter.post(
  "/",
  userMiddleware.verifyUser,
  imageMiddleware.upload.fields([
    { name: "image" },
    { name: "name" },
    { name: "description" },
    { name: "area" },
    { name: "getDate" },
    { name: "takePlace" },
    { name: "lostPlace" },
    { name: "status" },
    { name: "categoryName" },
  ]),
  itemMiddleware.checkCreateData("body"),
  imageMiddleware.resizingItem,
  itemController.createItem
);

// 모든 분실물 조회 (필터 + 이름)
itemRouter.get("/", itemController.searchItems);

// 분실물 상세조회
itemRouter.get("/:id", itemController.findItem);

// 분실물 수정
itemRouter.patch(
  "/:id",
  userMiddleware.verifyUser,
  imageMiddleware.upload.fields([
    { name: "image" },
    { name: "name" },
    { name: "description" },
    { name: "area" },
    { name: "getDate" },
    { name: "takePlace" },
    { name: "lostPlace" },
    { name: "status" },
    { name: "categoryName" },
  ]),
  itemMiddleware.checkEditData("body"),
  imageMiddleware.resizingEditItem,
  itemController.updateItem
);

// 분실물 회수
itemRouter.patch(
  "/pickup/:id",
  userMiddleware.verifyUser,
  itemMiddleware.checkPickupData("body"),
  itemController.getItem
);

// 분실물 삭제
itemRouter.delete("/:id", userMiddleware.verifyUser, itemController.deleteItem);

module.exports = itemRouter;
