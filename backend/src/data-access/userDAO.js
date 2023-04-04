const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const AppError = require("../misc/AppError");
const errors = require("../misc/errors");
const fs = require("fs");

const userDAO = {
  async createUser({ email, name, password, displayName }) {
    await prisma.User.findUniqueOrThrow({
      where: { email: email },
    })
      .then(() => {
        throw new AppError(
          errors.errorCodes.USER_EMAIL_ERROR,
          400,
          errors.errorMessages.userEmailFoundError
        );
      })
      .catch(() => {});
    const user = await prisma.User.create({
      data: {
        name: name,
        email: email,
        password: password,
        displayName: displayName,
        imageId: 1,
      },
    });
    return user;
  },

  async createCompanyUser({ email, name, password, displayName, company }) {
    await prisma.User.findUniqueOrThrow({
      where: { email: email },
    })
      .then(() => {
        throw new AppError(
          errors.errorCodes.USER_EMAIL_ERROR,
          400,
          errors.errorMessages.userEmailFoundError
        );
      })
      .catch(() => {});
    const user = await prisma.User.create({
      data: {
        name: name,
        email: email,
        password: password,
        displayName: displayName,
        imageId: 1,
      },
    });
    const existentCompany = await prisma.Company.findUnique({
      where: {
        name: company,
      },
    });
    await prisma.companyUser.create({
      data: { userId: user.id, companyId: existentCompany.id },
    });
    user["company"] = company;
    return user;
  },

  async identifyUser({ id }) {
    const user = await prisma.User.findUnique({
      where: {
        id: id,
      },
      include: {
        image: {
          include: {
            imageDetail: { select: { large: true } },
          },
        },
        companyUser: {
          select: {
            companyId: true,
          },
        },
      },
    });

    if (user.companyUser.length > 0) {
      const existentCompany = await prisma.Company.findUnique({
        where: {
          id: user.companyUser[0].companyId,
        },
      });
      user["company"] = existentCompany.name;
      return user;
    }
    return user;
  },

  // 개인 => 개인 or 기업 => 개인
  async editUser({ id, email, name, password, displayName, image, company }) {
    if (image !== null) {
      // 현재 유저를 검색
      const foundUser = await prisma.User.findUnique({
        where: { id: id },
      });

      if (foundUser.imageId != 1) {
        const updatedImage = await prisma.Image.findUnique({
          where: { id: foundUser.imageId },
        });

        const updatedResizingImages = await prisma.imageDetail.findUnique({
          where: { imageId: foundUser.imageId },
        });

        fs.unlinkSync(updatedImage.imageUrl);
        fs.unlinkSync(updatedResizingImages.small);
        fs.unlinkSync(updatedResizingImages.large);

        await prisma.Image.update({
          where: { id: foundUser.imageId },
          data: {
            imageUrl: "uploads/" + image,
          },
        });
        await prisma.imageDetail.update({
          where: { imageId: foundUser.imageId },
          data: {
            small: "uploads/small/" + image,
            large: "uploads/large/" + image,
          },
        });
        const user = await prisma.User.update({
          where: {
            id: id,
          },
          data: {
            name: name,
            email: email,
            password: password,
            displayName: displayName,
          },
        });
        // 삭제 : company => null , 유지 : company => undefined
        if (company !== undefined && company == null) {
          await prisma.companyUser.delete({
            where: { userId: id },
          });
        }
        return user;
      } else {
        const newImage = await prisma.Image.create({
          data: {
            imageUrl: "uploads/" + image,
          },
        });
        await prisma.imageDetail.create({
          data: {
            imageId: newImage.id,
            small: "uploads/small/" + image,
            large: "uploads/large/" + image,
          },
        });
        const user = await prisma.User.update({
          where: {
            id: id,
          },
          data: {
            name: name,
            email: email,
            password: password,
            displayName: displayName,
            imageId: newImage.id,
          },
        });
        // 삭제 : company => null , 유지 : company => undefined
        if (company !== undefined && company == null) {
          await prisma.companyUser.delete({
            where: { userId: id },
          });
        }
        return user;
      }
    }
    const user = await prisma.User.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        password: password,
        displayName: displayName,
      },
    });
    if (company !== undefined && company == null) {
      await prisma.companyUser.delete({
        where: { userId: id },
      });
    }
    return user;
  },

  // 기업 => 기업 or 개인 => 기업
  async editCompanyUser({
    id,
    email,
    name,
    password,
    displayName,
    image,
    company,
  }) {
    // 입력받은 회사 id 찾기
    const userCompany = await prisma.Company.findUnique({
      where: {
        name: company,
      },
    });

    if (image !== null) {
      // id로 유저찾기
      const foundUser = await prisma.User.findUnique({
        where: { id: id },
      });
      if (foundUser.imageId != 1) {
        const updatedImage = await prisma.Image.findUnique({
          where: { id: foundUser.imageId },
        });

        const updatedResizingImages = await prisma.imageDetail.findUnique({
          where: { imageId: foundUser.imageId },
        });
        fs.unlinkSync(updatedImage.imageUrl);
        fs.unlinkSync(updatedResizingImages.small);
        fs.unlinkSync(updatedResizingImages.large);

        await prisma.Image.update({
          where: { id: foundUser.imageId },
          data: {
            imageUrl: "uploads/" + image,
          },
        });
        await prisma.imageDetail.update({
          where: { imageId: foundUser.imageId },
          data: {
            small: "uploads/small/" + image,
            large: "uploads/large/" + image,
          },
        });
        const user = await prisma.User.update({
          where: {
            id: id,
          },
          data: {
            name: name,
            email: email,
            password: password,
            displayName: displayName,
          },
        });
        await prisma.companyUser.upsert({
          where: {
            userId: id,
          },
          create: {
            userId: id,
            companyId: userCompany.id,
          },
          update: {
            companyId: userCompany.id,
          },
        });
        user["company"] = company;
        return user;
      } else {
        const newImage = await prisma.Image.create({
          data: {
            imageUrl: "uploads/" + image,
          },
        });
        await prisma.imageDetail.create({
          data: {
            imageId: newImage.id,
            small: "uploads/small/" + image,
            large: "uploads/large/" + image,
          },
        });
        const user = await prisma.User.update({
          where: {
            id: id,
          },
          data: {
            name: name,
            email: email,
            password: password,
            displayName: displayName,
            imageId: newImage.id,
          },
        });
        await prisma.companyUser.upsert({
          where: {
            userId: id,
          },
          create: {
            userId: id,
            companyId: userCompany.id,
          },
          update: {
            companyId: userCompany.id,
          },
        });
        user["company"] = company;
        return user;
      }
    }
    const user = await prisma.User.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        password: password,
        displayName: displayName,
      },
    });
    await prisma.companyUser.upsert({
      where: {
        userId: id,
      },
      create: {
        userId: id,
        companyId: userCompany.id,
      },
      update: {
        companyId: userCompany.id,
      },
    });
    user["company"] = company;
    return user;
  },

  async deleteUser({ id }) {
    const user = await prisma.User.findUnique({
      where: {
        id: id,
      },
    });
    await prisma.companyUser
      .delete({
        where: {
          userId: id,
        },
      })
      .then()
      .catch(() => {});
    const items = await prisma.Item.findMany({
      where: {
        editedUserId: id,
      },
    });
    const boards = await prisma.Board.findMany({
      where: {
        userId: id,
      },
    });
    if (items) {
      await Promise.all(
        items.map(async (data) => {
          if (data.imageId != 2) {
            const imageDetail = await prisma.imageDetail.delete({
              where: {
                imageId: data.imageId,
              },
            });
            const image = await prisma.Image.delete({
              where: {
                id: data.imageId,
              },
            });
            fs.unlinkSync(image.imageUrl);
            fs.unlinkSync(imageDetail.medium);
          }
        })
      );
    }
    if (boards) {
      await Promise.all(
        boards.map(async (data) => {
          if (data.imageId) {
            const image = await prisma.Image.delete({
              where: {
                id: data.imageId,
              },
            });
            fs.unlinkSync(image.imageUrl);
          }
        })
      );
    }

    if (user.imageId) {
      if (user.imageId != 1) {
        const deleteResizingImage = await prisma.imageDetail.delete({
          where: { imageId: user.imageId },
        });
        const deleteImage = await prisma.Image.delete({
          where: { id: user.imageId },
        });
        fs.unlinkSync(deleteImage.imageUrl);
        fs.unlinkSync(deleteResizingImage.small);
        fs.unlinkSync(deleteResizingImage.large);
      }
    }
    await prisma.Board.deleteMany({
      where: {
        userId: id,
      },
    })
      .then()
      .catch(() => {});
    await prisma.Item.deleteMany({
      where: {
        editedUserId: id,
      },
    })
      .then()
      .catch(() => {});
    await prisma.User.delete({
      where: {
        id: id,
      },
    })
      .then()
      .catch(() => {});
  },

  async listCompany() {
    const companies = await prisma.Company.findMany({
      select: {
        name: true,
      },
    });
    return companies;
  },
};

module.exports = userDAO;
