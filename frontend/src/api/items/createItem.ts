import { client, multipartClient } from "../httpClient";

// TODO : 백엔드 Entity 변경 가능성
export interface ResponseCreateItem {
  itemId: number;
}

interface CreateItemArgs {
  name: string;
  description: string;
  status: "";
  category: "";
  img?: "";
  retrievedDate: number;
  area: string;
  takePlace: string;
}

export async function createItem({
  area,
  category,
  description,
  name,
  retrievedDate,
  status,
  takePlace,
  img,
}: CreateItemArgs) {
  const {
    data: { itemId },
  } = await multipartClient.post<ResponseCreateItem>(`/api/items`, {
    area,
    category,
    description,
    name,
    retrievedDate,
    status,
    takePlace,
    img,
  });
  return itemId;
}
