import { IntegrationBoardModel } from "@/models/boardModel";
import { client } from "../httpClient";

interface FetchBoardsArgs {
  searchKeyword: string;
  page: number;
}

export async function fetchBoards({ searchKeyword, page }: FetchBoardsArgs) {
  const { data } = await client.get<IntegrationBoardModel>(`/api/boards`, {
    params: {
      name: searchKeyword,
      page,
    },
  });
  return data!;
}
