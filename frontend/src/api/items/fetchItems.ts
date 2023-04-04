import { IntegrationItemModel } from "@/models/itemModel";
import { client } from "../httpClient";

interface FetchItemsArgs {
  searchKeyword: string;
  page: number;
  categoryNames: string;
  duration: string;
}

export async function fetchItems({
  searchKeyword,
  page,
  categoryNames,
  duration,
}: FetchItemsArgs) {
  const { data } = await client.get<IntegrationItemModel>(`/api/items`, {
    params: {
      name: searchKeyword,
      page,
      categoryNames,
      duration,
    },
  });
  return data!;
}
