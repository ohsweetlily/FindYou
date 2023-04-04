const { boardService } = require("../service");
const AppError = require("../misc/AppError");
const errors = require("../misc/errors");
const commons = require("../misc/commons");
const fs = require("fs");

const boardController = {
  async createBoard(req, res, next) {
    const { id } = req.user;
    const { name, description, categoryName, lostPlace, lostDate } = req.body;
    const image =
      Object.keys(req.files).length !== 0 ? req.files.image[0].filename : null;
    try {
      const board = await boardService.createBoard({
        id,
        name,
        description,
        categoryName,
        lostPlace,
        lostDate,
        image,
      });
      res.json(board);
    } catch (err) {
      fs.unlinkSync("uploads/" + image);
      next(
        new AppError(
          errors.errorCodes.BOARD_CREATE_ERROR,
          400,
          errors.errorMessages.BOARD_CREATE_ERROR
        )
      );
    }
  },
  async searchBoard(req, res, next) {
    const { name } = req.query;
    const page = Number(req.query.page || commons.DEFAULT_PAGE);
    const display = Number(req.query.display || commons.DEFAULT_DISPLAY);
    try {
      const boards = await boardService.searchBoard({ name, page, display });
      res.json(boards);
    } catch (err) {
      next(
        new AppError(
          errors.errorCodes.BOARD_SEARCH_ERROR,
          400,
          errors.errorMessages.BOARD_SEARCH_ERROR
        )
      );
    }
  },
  async editBoard(req, res, next) {
    const { id } = req.params;
    const { name, description, categoryName, lostPlace, lostDate } = req.body;
    const image =
      Object.keys(req.files).length !== 0 ? req.files.image[0].filename : null;
    try {
      const board = await boardService.editBoard({
        id,
        name,
        description,
        categoryName,
        lostPlace,
        lostDate,
        image,
      });
      res.json(board);
    } catch (err) {
      next(
        new AppError(
          errors.errorCodes.BOARD_EDIT_ERROR,
          400,
          errors.errorMessages.BOARD_EDIT_ERROR
        )
      );
    }
  },
  async deleteBoard(req, res, next) {
    const { id } = req.params;
    try {
      await boardService.deleteBoard({ id });
      res.json({ data: "삭제가 완료되었습니다." });
    } catch (err) {
      next(
        new AppError(
          errors.errorCodes.BOARD_DELETE_ERROR,
          400,
          errors.errorMessages.BOARD_DELETE_ERROR
        )
      );
    }
  },
  async findBoard(req, res, next) {
    const { id } = req.params;
    try {
      const board = await boardService.findBoard({ id });
      res.json(board);
    } catch (err) {
      next(
        new AppError(
          errors.errorCodes.BOARD_FIND_ERROR,
          400,
          errors.errorMessages.BOARD_FIND_ERROR
        )
      );
    }
  },
};
module.exports = boardController;
