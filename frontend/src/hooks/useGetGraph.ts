import { useQuery } from "@tanstack/react-query";
import { getGraph } from "@/api/graph/getGraph";
import { AxiosResponse } from "axios";

type Parmas = 1 | 2 | 3 | 4;

interface Return<T> {
  data: T | undefined;
  error: unknown;
  isLoading: boolean;
}

const useGetGraph = <T>(graphNum: Parmas): Return<T> => {
  const { data, error, isLoading } = useQuery<AxiosResponse<T>>(
    [`/api/main/graph${graphNum}`],
    () => getGraph(graphNum)
  );
  return { data: data?.data, error, isLoading };
};

export default useGetGraph;
