const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const mainDAO = {
  // 카테고리 별 총 분실량 / 총 회수량
  async categoryCount() {
    // 카테고리 별 id, 이름, 개수
    const allCategoryItems = await prisma.Category.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            item: true,
          },
        },
      },
    });
    // 카테고리 별 수령 개수
    const pickupItems = await prisma.Item.groupBy({
      by: ["categoryId"],
      where: {
        status: "pickup",
      },
      _count: {
        _all: true,
      },
      orderBy: {
        categoryId: "asc",
      },
    });
    return { allCategoryItems, pickupItems };
  },

  // 보관/이관중인 분실물과 수령된 분실물 반환
  async listMonthItems({ year, month }) {
    // 이번 달 보관/이관량
    const storeItems = await prisma.Item.count({
      where: {
        AND: [
          { getDate: { gt: new Date(year + "-" + month.toString()) } },
          {
            getDate: { lt: new Date(year + "-" + (month + 1).toString()) },
          },
        ],
        OR: [{ status: "store" }, { status: "transfer" }],
      },
    });
    // 이번 달 수령량
    const pickupItems = await prisma.Item.count({
      where: {
        AND: [
          { getDate: { gt: new Date(year + "-" + month.toString()) } },
          {
            getDate: { lt: new Date(year + "-" + (month + 1).toString()) },
          },
          { status: "pickup" },
        ],
      },
    });
    return { storeItems, pickupItems };
  },

  // reward 내림차순으로 3명 반환(name, reward)
  async rewardRank() {
    const rank = await prisma.User.findMany({
      orderBy: {
        reward: "desc",
      },
      select: {
        name: true,
        reward: true,
        image: {
          include: {
            imageDetail: { select: { small: true } },
          },
        },
        _count: {
          select: { pickupItems: true },
        },
      },
      take: 3,
    });
    return rank;
  },

  // 새로운 분실물 5개
  async newItems() {
    const items = await prisma.Item.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        categoryId: true,
        name: true,
        createdAt: true,
        lostPlace: true,
        image: {
          include: {
            imageDetail: { select: { medium: true } },
          },
        },
      },
      take: 5,
    });
    return items;
  },

  async monthlyCount() {
    const lostCounts = await prisma.Item.groupBy({
      by: ["getDate"],
      _count: {
        status: true,
      },
    });

    const getCounts = await prisma.Item.groupBy({
      by: ["getDate"],
      _count: {
        status: true,
      },
      where: {
        status: "pickup",
      },
    });

    return { lostCounts, getCounts };
  },

  async areaCount() {
    const totalAreaLost = await prisma.Item.groupBy({
      by: ["area"],
      _count: {
        status: true,
      },
      orderBy: {
        area: "asc",
      },
    });

    const pickupAreaLost = await prisma.Item.groupBy({
      by: ["area"],
      _count: {
        status: true,
      },
      where: {
        status: "pickup",
      },
      orderBy: {
        area: "asc",
      },
    });

    return { totalAreaLost, pickupAreaLost };
  },

  async AllListsCount() {
    const lostProperties = await prisma.Item.count({
      select: {
        _all: true,
      },
    });
    const pickupProperties = await prisma.Item.count({
      select: {
        _all: true,
      },
      where: {
        status: "pickup",
      },
    });
    return { lostProperties, pickupProperties };
  },
};
module.exports = mainDAO;
