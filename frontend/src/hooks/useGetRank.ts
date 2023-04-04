import { useQuery } from "@tanstack/react-query";
import { RankModel } from "@/models/rankModel";
import { getRank } from "@/api/rank/getRank";

interface Return {
  data: RankModel[] | undefined;
  error: unknown;
  isLoading: boolean;
}

const useGetRank = () => {
  const { data, error, isLoading } = useQuery(["/api/main/rank"], () =>
    getRank()
  );

  return { data, error, isLoading };
};

export default useGetRank;
