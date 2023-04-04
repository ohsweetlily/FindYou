const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const imageDAO = {
  async originalFind({ id }) {
    const user = await prisma.User.findUnique({
      where: { id: id },
    });
    const image = await prisma.Image.findUnique({
      where: { id: user.imageId },
    });
    return image;
  },

  async resizingFind({ id, size }) {
    const user = await prisma.User.findUnique({
      where: { id: id },
    });
    const image = await prisma.imageDetail.findUnique({
      where: { imageId: user.imageId },
    });
    return image;
  },
};

module.exports = imageDAO;
