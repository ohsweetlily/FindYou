import { client } from "../httpClient";

interface FetchBoardArgs {
  boardId: number;
}

export async function fetchBoard({ boardId }: FetchBoardArgs) {
  const { data } = await client.get(`/api/boards/${boardId}`);
  return data;
}
