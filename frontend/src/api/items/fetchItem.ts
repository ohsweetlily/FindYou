import { ItemModel, IntegrationItemModel } from "@/models/itemModel";
import { client } from "../httpClient";

export interface ResponseFetchItem {
  item: ItemModel;
}

interface FetchItemArgs {
  itemId: number;
}

export async function fetchItem({ itemId }: FetchItemArgs) {
  const { data } = await client.get<ItemModel>(`/api/items/${itemId}`);
  return data;
}
