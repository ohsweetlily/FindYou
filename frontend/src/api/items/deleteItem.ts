import { ItemModel } from "@/models/itemModel";
import { client } from "../httpClient";

interface DeleteItemArgs {
  itemId: number;
}

export async function deleteItem({ itemId }: DeleteItemArgs) {
  await client.delete<null>(`/api/items/${itemId}`);
}
