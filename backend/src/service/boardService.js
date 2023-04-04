const { boardDAO } = require("../data-access");

const CATEGORY_MAP = {
  1: "핸드폰",
  2: "가방",
  3: "지갑",
  4: "옷",
  5: "쇼핑백",
  6: "서류봉투",
  7: "책",
  8: "장난감",
  9: "파일",
  10: "기타",
};

const boardService = {
  async createBoard({
    id,
    name,
    description,
    categoryName,
    lostPlace,
    lostDate,
    image,
  }) {
    const board = await boardDAO.createBoard({
      id,
      name,
      description,
      categoryName,
      lostPlace,
      lostDate,
      image,
    });
    return { data: board };
  },
  async searchBoard({ name, page, display }) {
    const board = await boardDAO.searchBoard({ name, page, display });
    const filteringBoards = board.boards.map((item) => {
      item["userName"] = item["user"]["name"];
      item["createdAt"] = item["createdAt"].toISOString().substr(0, 10);
      item["categoryName"] = CATEGORY_MAP[item["categoryId"]];
      item["lostDate"] = item["lostDate"].toISOString().substr(0, 10);
      delete item["user"];
      delete item["categoryId"];
      return item;
    });
    const totalBoards = board.totalBoards;
    const totalPages = board.totalPages;
    return {
      data: {
        boards: filteringBoards,
        totalBoards: totalBoards,
        totalPages: totalPages,
      },
    };
  },
  async editBoard({
    id,
    name,
    description,
    categoryName,
    lostPlace,
    lostDate,
    image,
  }) {
    const board = await boardDAO.editBoard({
      id,
      name,
      description,
      categoryName,
      lostPlace,
      lostDate,
      image,
    });
    board["lostDate"] = board["lostDate"].toISOString().substr(0, 10);
    board["createdAt"] = board["createdAt"].toISOString().substr(0, 10);
    board["updatedAt"] = board["updatedAt"].toISOString().substr(0, 10);
    return { data: board };
  },
  async deleteBoard({ id }) {
    await boardDAO.deleteBoard({ id });
  },
  async findBoard({ id }) {
    const board = await boardDAO.findBoard({ id });
    board["lostDate"] = board["lostDate"].toISOString().substr(0, 10);
    board["createdAt"] = board["createdAt"].toISOString().substr(0, 10);
    board["categoryName"] = CATEGORY_MAP[board["categoryId"]];
    board["userName"] = board["user"]["name"];
    if (board["image"]) board["imageUrl"] = board["image"]["imageUrl"];
    else board["imageUrl"] = null;
    delete board["image"];
    delete board["categoryId"];
    delete board["user"];
    return { data: board };
  },
};
module.exports = boardService;
