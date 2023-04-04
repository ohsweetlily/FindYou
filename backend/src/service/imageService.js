const { imageDAO } = require("../data-access");
const imageService = {
  async originalFind({ id }) {
    const image = await imageDAO.originalFind({ id });
    return image.imageUrl;
  },

  async resizingFind({ id, size }) {
    const image = await imageDAO.resizingFind({ id, size });
    return image[size];
  },
};
module.exports = imageService;
