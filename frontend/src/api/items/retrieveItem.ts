import { client } from "../httpClient";

// TODO : 백엔드 Entity 변경 가능성
export interface ResponseCreateItem {
  itemId: number;
}

interface RetrieveItemArgs {
  itemId: number;
}

export async function retrieveItem({ itemId }: RetrieveItemArgs) {
  await client.patch<null>(`/api/items`, {
    itemId,
  });
}
