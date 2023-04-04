import { fetchItems } from "@/api/items/fetchItems";
import { IntegrationItemModel } from "@/models/itemModel";
import { useQuery } from "@tanstack/react-query";

interface UseGetItemsArgs {
  searchKeyword: string;
  page: number;
  categoryNames: string;
  duration: string;
}

// 키워드 안에 넣은 것들이 바뀔 때마다 캐싱됨
export function useGetItems({
  searchKeyword,
  page,
  categoryNames,
  duration,
}: UseGetItemsArgs) {
  const { data, error, isLoading } = useQuery<IntegrationItemModel>(
    ["items", searchKeyword, page, categoryNames, duration],
    () => fetchItems({ searchKeyword, page, categoryNames, duration })
  );

  return { items: data, error, isLoading };
}
