const { itemDAO } = require("../data-access");

const itemService = {
  async createItem({
    name,
    description,
    status,
    categoryName,
    editedUserId,
    image,
    area,
    lostPlace,
    getDate,
    takePlace,
  }) {
    const addeditem = await itemDAO.createItem({
      name,
      description,
      status,
      categoryName,
      editedUserId,
      image,
      area,
      lostPlace,
      getDate,
      takePlace,
    });
    return { data: addeditem };
  },
  async searchItems({ categoryNames, name, page, display, duration }) {
    const allItems = await itemDAO.searchItems({
      categoryNames,
      name,
      page,
      display,
      duration,
    });
    const items = allItems.item.map((item) => {
      item.imageUrl = item.image.imageDetail[0].medium;
      item.categoryName = item.category.name;
      item.getDate = item.getDate.toISOString().substr(0, 10);
      delete item["image"];
      delete item["category"];
      return item;
    });
    const totalItems = allItems.totalItems;
    const totalPages = allItems.totalPages;
    return {
      data: { items: items, totalItems: totalItems, totalPages: totalPages },
    };
  },

  async findItem({ id }) {
    const item = await itemDAO.findItem({ id });
    item["categoryName"] = item["category"]["name"];
    item["userName"] = item["editedUser"]["displayName"];
    item["imageUrl"] = item["image"]["imageDetail"][0]["medium"];
    item["createdAt"] = item["createdAt"].toISOString().substr(0, 10);
    item["getDate"] = item["getDate"].toISOString().substr(0, 10);
    delete item["category"];
    delete item["editedUser"];
    delete item["image"];
    return { data: item };
  },
  async updateItem({
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
  }) {
    const item = await itemDAO.updateItem({
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
    return { data: item };
  },
  async getItem({ id, userId, status, pickupDate }) {
    const item = await itemDAO.getItem({
      id,
      userId,
      status,
      pickupDate,
    });
    return { data: item };
  },
  async deleteItem({ id }) {
    await itemDAO.delete({ id });
  },
};

module.exports = itemService;
