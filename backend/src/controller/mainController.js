const { mainService } = require("../service");
const AppError = require("../misc/AppError");
const errors = require("../misc/errors");

const mainController = {
  // 카테고리 그래프
  async categoryCount(req, res, next) {
    await mainService
      .categoryCount()
      .then((data) => res.json(data))
      .catch(() =>
        next(
          new AppError(
            errors.errorCodes.CATEGORY_GRAPH_ERROR,
            400,
            errors.errorMessages.CATEGORY_GRAPH_ERROR
          )
        )
      );
  },

  // 보관/이관, 수령 분실물
  async listMonthItems(req, res, next) {
    await mainService
      .listMonthItems()
      .then((data) => res.json(data))
      .catch(() =>
        next(
          new AppError(
            errors.errorCodes.ITEM_LIST_ERROR,
            400,
            errors.errorMessages.ITEM_LIST_ERROR
          )
        )
      );
  },

  // 3위까지 랭킹
  async rewardRank(req, res, next) {
    await mainService
      .rewardRank()
      .then((data) => res.json(data))
      .catch(() =>
        next(
          new AppError(
            errors.errorCodes.REWARD_RANK_ERROR,
            400,
            errors.errorMessages.REWARD_RANK_ERROR
          )
        )
      );
  },

  // 새로운 분실물(5개)
  async newItems(req, res, next) {
    await mainService
      .newItems()
      .then((data) => res.json(data))
      .catch(() =>
        next(
          new AppError(
            errors.errorCodes.NEW_ITEMS_ERROR,
            400,
            errors.errorMessages.NEW_ITEMS_ERROR
          )
        )
      );
  },

  // 월별 그래프
  async monthlyCount(req, res, next) {
    await mainService
      .monthlyCount()
      .then((data) => res.json(data))
      .catch(() =>
        next(
          new AppError(
            errors.errorCodes.MONTHLY_GRAPH_ERROR,
            400,
            errors.errorMessages.MONTHLY_GRAPH_ERROR
          )
        )
      );
  },

  // 자치구별 그래프
  async areaCount(req, res, next) {
    await mainService
      .areaCount()
      .then((data) => res.json(data))
      .catch(() =>
        next(
          new AppError(
            errors.errorCodes.AREA_GRAPH_ERROR,
            400,
            errors.errorMessages.AREA_GRAPH_ERROR
          )
        )
      );
  },

  async AllListsCount(req, res, next) {
    await mainService
      .AllListsCount()
      .then((data) => res.json(data))
      .catch(() =>
        next(
          new AppError(
            errors.errorCodes.ALL_LISTS_GRAPH_ERROR,
            400,
            errors.errorMessages.ALL_LISTS_GRAPH_ERROR
          )
        )
      );
  },
};

module.exports = mainController;
