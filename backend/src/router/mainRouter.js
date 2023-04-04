const express = require("express");
const { mainController } = require("../controller");
const mainRouter = express.Router();

// 이번 달 보관/이관중인 분실물과 수령된 분실물 반환
mainRouter.get("/items", mainController.listMonthItems);

// reward 내림차순으로 3명 반환
mainRouter.get("/rank", mainController.rewardRank);

// 새로운 분실물 5개
mainRouter.get("/new", mainController.newItems);

// 월별 그래프
mainRouter.get("/graph/1", mainController.monthlyCount);

// 자치구별 그래프
mainRouter.get("/graph/2", mainController.areaCount);

// 카테고리 그래프
mainRouter.get("/graph/3", mainController.categoryCount);

// 총 분실량/ 총 회수량 그래프
mainRouter.get("/graph/4", mainController.AllListsCount);

module.exports = mainRouter;
