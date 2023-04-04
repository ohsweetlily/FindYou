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

const itemDAO = {
  // 분실물 등록
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
    const userImage = await prisma.Image.create({
      data: {
        imageUrl: "uploads/" + image,
      },
    });
    await prisma.imageDetail.create({
      data: {
        imageId: userImage.id,
        medium: "uploads/medium/" + image,
      },
    });
    const item = await prisma.item.create({
      data: {
        name,
        description,
        status,
        categoryId: CATEGORY_MAP[categoryName],
        editedUserId,
        imageId: userImage.id,
        area,
        lostPlace,
        getDate: new Date(getDate),
        takePlace,
      },
    });
    return item;
  },

  async findItem({ id }) {
    console.log(id);
    const item = await prisma.Item.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        category: {
          select: {
            name: true,
          },
        },
        editedUser: {
          select: {
            displayName: true,
          },
        },
        image: {
          include: {
            imageDetail: { select: { medium: true } },
          },
        },
        takePlace: true,
        lostPlace: true,
        createdAt: true,
        getDate: true,
      },
    });
    return item;
  },
  // 분실물 검색
  async searchItems({ categoryNames, name, page, display, duration }) {
    const today = new Date();
    let newDay = new Date(today);

    switch (duration) {
      case "당일":
        console.log("당일");
        newDay.setHours(0, 0, 0);
        break;
      case "3일":
        console.log("3일");
        newDay.setDate(today.getDate() - 3);
        break;
      case "1주일":
        console.log("1주일");
        newDay.setDate(today.getDate() - 7);
        break;
      case "1달":
        console.log("1달");
        newDay.setMonth(today.getMonth() - 1);
        break;
      default:
        console.log("없음");
        newDay.setFullYear(2015);
        break;
    }
    if (categoryNames) {
      const categoryIdsMap = categoryNames.split(",").reduce((map, value) => {
        map.push({ categoryId: CATEGORY_MAP[value] });
        return map;
      }, []);
      const item = await prisma.Item.findMany({
        where: {
          OR: categoryIdsMap,
          AND: [
            {
              name: {
                contains: name,
              },
            },
            {
              createdAt: {
                gt: newDay,
              },
            },
          ],
        },
        skip: display * (page - 1),
        take: display,
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          name: true,
          getDate: true,
          takePlace: true,
          category: {
            select: {
              name: true,
            },
          },
          image: {
            include: {
              imageDetail: { select: { medium: true } },
            },
          },
        },
      });
      const totalItems = await prisma.Item.count({
        where: {
          OR: categoryIdsMap,
          AND: [
            {
              name: {
                contains: name,
              },
            },
            {
              createdAt: {
                gt: newDay,
              },
            },
          ],
        },
      });
      const totalPages = Math.ceil(totalItems / display);
      return { item, totalItems, totalPages };
    } else {
      const item = await prisma.Item.findMany({
        where: {
          AND: [
            {
              name: {
                contains: name,
              },
            },
            {
              createdAt: {
                gt: newDay,
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          getDate: true,
          takePlace: true,
          category: {
            select: {
              name: true,
            },
          },
          image: {
            include: {
              imageDetail: { select: { medium: true } },
            },
          },
        },
        skip: display * (page - 1),
        take: display,
        orderBy: {
          id: "asc",
        },
      });
      const totalItems = await prisma.Item.count({
        where: {
          AND: [
            {
              name: {
                contains: name,
              },
            },
            {
              createdAt: {
                gt: newDay,
              },
            },
          ],
        },
      });
      const totalPages = Math.ceil(totalItems / display);
      return { item, totalItems, totalPages };
    }
  },
  // 분실물 수정
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
    const foundItem = await prisma.Item.findUnique({
      where: { id: Number(id) },
    });
    const date = getDate ? getDate : foundItem.getDate;
    if (image !== null) {
      if (foundItem.imageId != 2) {
        // 업데이트할 image 테이블
        await prisma.Image.findUnique({
          where: { id: foundItem.imageId },
        })
          .then((item) => fs.unlinkSync(item.imageUrl))
          .catch(() => {});
        // 업데이트할 imageDetail 테이블
        const mediumImage = await prisma.imageDetail.findUnique({
          where: { imageId: foundItem.imageId },
        });
        console.log(mediumImage);
        fs.unlinkSync(mediumImage.medium);

        await prisma.Image.update({
          where: { id: foundItem.imageId },
          data: {
            imageUrl: "uploads/" + image,
          },
        })
          .then()
          .catch(() => {});
        await prisma.imageDetail
          .update({
            where: { imageId: foundItem.imageId },
            data: {
              medium: "uploads/medium/" + image,
            },
          })
          .then()
          .catch(() => {});
        const item = await prisma.Item.update({
          where: {
            id: Number(id),
          },
          data: {
            name,
            description,
            area,
            getDate: new Date(date),
            takePlace,
            lostPlace,
            status,
            categoryId: CATEGORY_MAP[categoryName],
          },
        });
        return item;
      } else {
        const newImage = await prisma.Image.create({
          data: {
            imageUrl: "uploads/" + image,
          },
        });
        await prisma.imageDetail.create({
          data: {
            imageId: newImage.id,
            medium: "uploads/medium/" + image,
          },
        });
        const item = await prisma.Item.update({
          where: {
            id: Number(id),
          },
          data: {
            name,
            description,
            area,
            getDate: new Date(date),
            takePlace,
            lostPlace,
            status,
            categoryId: CATEGORY_MAP[categoryName],
            imageId: newImage.id,
          },
        });
        return item;
      }
    }
    const item = await prisma.Item.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
        area,
        getDate: new Date(date),
        takePlace,
        lostPlace,
        status,
        categoryId: CATEGORY_MAP[categoryName],
      },
    });
    return item;
  },

  // 분실물 회수
  async getItem({ id, userId, status, pickupDate }) {
    const item = await prisma.Item.update({
      where: {
        id: Number(id),
      },
      data: {
        pickupUserId: userId,
        status,
        pickupDate: new Date(pickupDate),
      },
    });
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    const reward = user.reward;
    await prisma.user.update({
      where: { id: userId },
      data: {
        reward: reward + 10,
      },
    });
    return item;
  },

  // 분실물 삭제
  async delete({ id }) {
    const item = await prisma.Item.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (item.imageId != 2) {
      const deleteResizingImage = await prisma.imageDetail.delete({
        where: { imageId: item.imageId },
      });
      const deleteImage = await prisma.Image.delete({
        where: { id: item.imageId },
      });
      fs.unlinkSync(deleteImage.imageUrl);
      fs.unlinkSync(deleteResizingImage.medium);
    }

    await prisma.Item.delete({
      where: {
        id: Number(id),
      },
    });
  },
};
module.exports = itemDAO;
