const { userDAO } = require("../data-access");

const userService = {
  async createUser({ email, name, password, displayName }) {
    const user = await userDAO.createUser({
      email,
      name,
      password,
      displayName,
    });
    return { data: user };
  },

  async createCompanyUser({ email, name, password, displayName, company }) {
    const user = await userDAO.createCompanyUser({
      email,
      name,
      password,
      displayName,
      company,
    });
    return { data: user };
  },

  async identifyUser({ id }) {
    const user = await userDAO.identifyUser({ id });
    user["imageUrl"] = user["image"]["imageDetail"][0]["large"];
    delete user["image"];
    delete user["companyUser"];
    return { data: user };
  },

  async editUser({ id, email, name, password, displayName, image, company }) {
    const user = await userDAO.editUser({
      id,
      email,
      name,
      password,
      displayName,
      image,
      company,
    });
    return { data: user };
  },

  async editCompanyUser({
    id,
    email,
    name,
    password,
    displayName,
    image,
    company,
  }) {
    const user = await userDAO.editCompanyUser({
      id,
      email,
      name,
      password,
      displayName,
      image,
      company,
    });
    return { data: user };
  },

  async deleteUser({ id }) {
    await userDAO.deleteUser({ id });
  },

  async listCompany() {
    const companies = await userDAO.listCompany();
    return { data: companies };
  },
};

module.exports = userService;
