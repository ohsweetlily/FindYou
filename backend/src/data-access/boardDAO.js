const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

const CATEGORY_MAP = {
  핸드폰: 1,
  가방: 2,
  지갑: 3,
  옷: 4,
  쇼핑백: 5,
  서류봉투: 6,
  책: 7,
  장난감: 8,
  파일: 9,
  기타: 10,
};

const boardDAO = {
  async createBoard({
    id,
    name,
    description,
    categoryName,
    lostPlace,
    lostDate,
    image,
  }) {
    if (image) {
      const boardImage = await prisma.Image.create({
        data: {
          imageUrl: "uploads/" + image,
        },
      });
      const board = await prisma.Board.create({
        data: {
          name,
          description,
          categoryId: CATEGORY_MAP[categoryName],
          lostPlace,
          lostDate: new Date(lostDate),
          userId: id,
          imageId: boardImage.id,
        },
      });
      return board;
    }
    const board = await prisma.Board.create({
      data: {
        name,
        description,
        categoryId: CATEGORY_MAP[categoryName],
        lostPlace,
        lostDate: new Date(lostDate),
        userId: id,
      },
    });
    return board;
  },

  async searchBoard({ name, page, display }) {
    const boards = await prisma.Board.findMany({
      where: { name: { contains: name } },
      skip: display * (page - 1),
      take: display,
      select: {
        id: true,
        name: true,
        user: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        categoryId: true,
      },
    });

    const totalBoards = await prisma.Board.count({
      where: { name: { contains: name } },
    });
    const totalPages = Math.ceil(totalBoards / display);
    return { boards, totalBoards, totalPages };
  },

  async findBoard({ id }) {
    const board = await prisma.Board.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        categoryId: true,
        user: true,
        lostDate: true,
        lostPlace: true,
        createdAt: true,
        description: true,
        image: true,
      },
    });
    return board;
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
    const updatingBoard = await prisma.Board.findUnique({
      where: { id: Number(id) },
    });
    const date = lostDate ? lostDate : updatingBoard.lostDate;
    if (image !== null) {
      if (updatingBoard.imageId) {
        const updatingImage = await prisma.Image.findUnique({
          where: { id: updatingBoard.imageId },
        });
        fs.unlinkSync(updatingImage.imageUrl);
        await prisma.Image.update({
          where: { id: updatingBoard.imageId },
          data: { imageUrl: "uploads/" + image },
        });
        const board = await prisma.Board.update({
          where: { id: Number(id) },
          data: {
            name,
            description,
            categoryId: CATEGORY_MAP[categoryName],
            lostPlace,
            lostDate: new Date(date),
          },
        });
        return board;
      } else {
        const boardImage = await prisma.Image.create({
          data: {
            imageUrl: "uploads/" + image,
          },
        });
        const board = await prisma.Board.update({
          where: { id: Number(id) },
          data: {
            name,
            description,
            categoryId: CATEGORY_MAP[categoryName],
            lostPlace,
            lostDate: new Date(date),
            imageId: boardImage.id,
          },
        });
        return board;
      }
    }
    const board = await prisma.Board.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        categoryId: CATEGORY_MAP[categoryName],
        lostPlace,
        lostDate: new Date(date),
      },
    });
    return board;
  },

  async deleteBoard({ id }) {
    const board = await prisma.Board.findUnique({
      where: { id: Number(id) },
    });
    if (board.imageId) {
      const deletedImage = await prisma.Image.delete({
        where: {
          id: board.imageId,
        },
      });
      fs.unlinkSync(deletedImage.imageUrl);
    }
    await prisma.Board.delete({
      where: { id: Number(id) },
    });
  },
};
module.exports = boardDAO;
