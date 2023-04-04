import { fetchNewItem } from "@/api/items/fetchNewItem";
import { NewItemsModel } from "@/models/newItemsModel";
import { useQuery } from "@tanstack/react-query";

export function useNewItems() {
  const { data, error, isLoading } = useQuery<NewItemsModel[]>(
    ["item", "new"],
    fetchNewItem,
    { initialData: [] } // 처음에 빈배열 넣어주기
  );

  return { newItems: data, error, isLoading };
}
