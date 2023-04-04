import { NewItemsModel } from "@/models/newItemsModel";
import { client } from "../httpClient";

export async function fetchNewItem() {
  const { data } = await client.get<NewItemsModel[]>("/api/main/new");
  return data!;
}
