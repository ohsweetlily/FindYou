import { useQuery } from "@tanstack/react-query";
import { fetchBoard } from "@/api/boards/fetchBoard";

const useGetBoardDetail = (boardId: number) => {
  const { data, error, isLoading } = useQuery([`/api/boards/${boardId}`], () =>
    fetchBoard({ boardId })
  );
  return { data, error, isLoading };
};

export default useGetBoardDetail;
