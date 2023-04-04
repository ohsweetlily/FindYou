const { mainDAO } = require("../data-access");

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

const mainService = {
  async categoryCount() {
    const categoryCounts = await mainDAO.categoryCount();
    // 카테고리 이름, 총 개수, 수령 개수 합치기
    let count = 0;
    const categoryList = categoryCounts.allCategoryItems.reduce((map, item) => {
      let getBack = 0;
      if (
        count < categoryCounts.pickupItems.length &&
        categoryCounts.pickupItems[count]["categoryId"] === item["id"]
      ) {
        getBack = categoryCounts.pickupItems[count]["_count"]["_all"];
        count += 1;
      }
      map.push({
        category: item["name"],
        lost: item["_count"]["item"],
        getBack: getBack,
      });
      return map;
    }, []);
    return { data: categoryList };
  },
  async listMonthItems() {
    const date = new Date();
    const year = date.toISOString().substring(0, 4);
    const month = parseInt(date.toISOString().substring(5, 7));
    const listItem = await mainDAO.listMonthItems({ year, month });
    return { data: listItem };
  },

  async rewardRank() {
    const rank = await mainDAO.rewardRank();
    rank.map((item) => {
      if (item["image"]) {
        item["imageUrl"] = item["image"]["imageDetail"][0]["small"];
      }
      item["pickupItems"] = item["_count"]["pickupItems"];
      delete item["_count"];
      delete item["image"];
    });
    return { data: rank };
  },

  async newItems() {
    const item = await mainDAO.newItems();
    const items = item.map((item) => {
      item.imageUrl = item.image.imageDetail[0].medium;
      item["categoryName"] = CATEGORY_MAP[item["categoryId"]];
      item.createdAt = item.createdAt.toISOString().substr(0, 10);
      delete item["categoryId"];
      delete item["image"];
      return item;
    });
    return { data: items };
  },

  async monthlyCount() {
    const month = [
      { month: "January", lost: 0, getBack: 0 },
      { month: "February", lost: 0, getBack: 0 },
      { month: "March", lost: 0, getBack: 0 },
      { month: "April", lost: 0, getBack: 0 },
      { month: "May", lost: 0, getBack: 0 },
      { month: "June", lost: 0, getBack: 0 },
      { month: "July", lost: 0, getBack: 0 },
      { month: "August", lost: 0, getBack: 0 },
      { month: "September", lost: 0, getBack: 0 },
      { month: "October", lost: 0, getBack: 0 },
      { month: "November", lost: 0, getBack: 0 },
      { month: "December", lost: 0, getBack: 0 },
    ];
    const monthlyCounts = await mainDAO.monthlyCount();
    monthlyCounts.lostCounts.map((item) => {
      const number = parseInt(item.getDate.toISOString().substr(5, 7));
      month[number - 1]["lost"] += item["_count"]["status"];
    });

    monthlyCounts.getCounts.map((item) => {
      const number = parseInt(item.getDate.toISOString().substr(5, 7));
      month[number - 1]["getBack"] += item["_count"]["status"];
    });
    return { data: month };
  },

  async areaCount() {
    const areaCounts = await mainDAO.areaCount();
    let i,
      j = 0;
    let map = [];

    for (i = 0; i < areaCounts.totalAreaLost.length; i++) {
      for (j = 0; j < areaCounts.pickupAreaLost.length; j++) {
        if (
          areaCounts.totalAreaLost[i]["area"] ===
          areaCounts.pickupAreaLost[j]["area"]
        ) {
          map.push({
            place: areaCounts.totalAreaLost[i]["area"],
            lost: areaCounts.totalAreaLost[i]["_count"]["status"],
            getBack: areaCounts.pickupAreaLost[j]["_count"]["status"],
          });
        }
      }
    }

    return { data: map };
  },

  async AllListsCount() {
    const allListsCounts = await mainDAO.AllListsCount();
    const allProperties = [
      { name: "lost", value: allListsCounts.lostProperties["_all"] },
      { name: "getBack", value: allListsCounts.pickupProperties["_all"] },
    ];
    return { data: allProperties };
  },
};
module.exports = mainService;
