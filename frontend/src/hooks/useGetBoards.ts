import { fetchBoards } from "@/api/boards/fetchBoards";
import { IntegrationBoardModel } from "@/models/boardModel";
import { useQuery } from "@tanstack/react-query";

interface UseGetBoardsArgs {
  searchKeyword: string;
  page: number;
}

// 키워드 안에 넣은 것들이 바뀔 때마다 캐싱됨
export function useGetBoards({ searchKeyword, page }: UseGetBoardsArgs) {
  const { data, error, isLoading } = useQuery<IntegrationBoardModel>(
    ["boards", searchKeyword, page],
    () => fetchBoards({ searchKeyword, page })
  );

  return { boards: data, error, isLoading };
}
