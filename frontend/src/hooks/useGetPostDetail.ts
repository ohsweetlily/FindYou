import { useQuery } from "@tanstack/react-query";
import { fetchItem } from "@/api/items/fetchItem";

const useGetPostDetail = (itemId: number) => {
  const { data, error, isLoading } = useQuery([`/api/items/${itemId}`], () =>
    fetchItem({ itemId })
  );
  return { data, error, isLoading };
};

export default useGetPostDetail;
