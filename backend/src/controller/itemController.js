const { itemService } = require("../service");
const AppError = require("../misc/AppError");
const commons = require("../misc/commons");
const errors = require("../misc/errors");

const itemController = {
  async createItem(req, res, next) {
    const { id } = req.user;
    const {
      name,
      description,
      status,
      categoryName,
      area,
      lostPlace,
      getDate,
      takePlace,
    } = req.body;
    const image = req.file.filename;
    try {
      const item = await itemService.createItem({
        name,
        description,
        status,
        categoryName,
        editedUserId: id,
        image,
        area,
        lostPlace,
        getDate,
        takePlace,
      });
      res.json(item);
    } catch (error) {
      next(
        new AppError(
          errors.errorCodes.ITEM_CREATE_ERROR,
          400,
          errors.errorMessages.ITEM_CREATE_ERROR
        )
      );
    }
  },
  async searchItems(req, res, next) {
    try {
      const { categoryNames, name, duration } = req.query;
      const page = Number(req.query.page || commons.DEFAULT_PAGE);
      const display = Number(req.query.display || commons.DEFAULT_DISPLAY);
      const item = await itemService.searchItems({
        categoryNames,
        name,
        page,
        display,
        duration,
      });
      res.json(item);
    } catch (error) {
      next(
        new AppError(
          errors.errorCodes.ITEM_SEARCH_ERROR,
          400,
          errors.errorMessages.ITEM_SEARCH_ERROR
        )
      );
    }
  },

  async findItem(req, res, next) {
    const { id } = req.params;
    try {
      const item = await itemService.findItem({ id });
      res.json(item);
    } catch (err) {
      next(
        new AppError(
          errors.errorCodes.ITEM_FIND_ERROR,
          400,
          errors.errorMessages.ITEM_FIND_ERROR
        )
      );
    }
  },
  async updateItem(req, res, next) {
    const { id } = req.params;
    const {
      name,
      description,
      area,
      getDate,
      takePlace,
      lostPlace,
      status,
      categoryName,
    } = req.body;
    const image =
      Object.keys(req.files).length !== 0 ? req.files.image[0].filename : null;
    try {
      const item = await itemService.updateItem({
        id,
        image,
        name,
        description,
        area,
        getDate,
        takePlace,
        lostPlace,
        status,
        categoryName,
      });
      res.json(item);
    } catch (err) {
      next(
        new AppError(
          errors.errorCodes.ITEM_EDIT_ERROR,
          400,
          errors.errorMessages.ITEM_EDIT_ERROR
        )
      );
    }
  },

  async getItem(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { status, pickupDate } = req.body;
      const item = await itemService.getItem({
        id,
        userId,
        status,
        pickupDate,
      });
      res.json(item);
    } catch (error) {
      next(
        new AppError(
          errors.errorCodes.ITEM_PICKUP_ERROR,
          400,
          errors.errorMessages.ITEM_PICKUP_ERROR
        )
      );
    }
  },
  async deleteItem(req, res, next) {
    try {
      const { id } = req.params;
      await itemService.deleteItem({ id });
      res.json({ data: "분실물 삭제가 완료되었습니다." });
    } catch (error) {
      next(
        new AppError(
          errors.errorCodes.ITEM_DELETE_ERROR,
          400,
          errors.errorMessages.ITEM_DELETE_ERROR
        )
      );
    }
  },
};

module.exports = itemController;
