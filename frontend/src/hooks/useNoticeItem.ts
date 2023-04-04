import { fetchNoticeItem } from "@/api/items/fetchNoticeItem";
import { NoticeItemModel } from "@/models/noticeItemModel";
import { useQuery } from "@tanstack/react-query";

export function useNoticeItem() {
  const { data, error, isLoading } = useQuery<NoticeItemModel>(
    ["item", "notice"],
    fetchNoticeItem
    // { initialData: [] } // 처음에 빈배열 넣어주기
  );

  return { noticeItem: data, error, isLoading };
}
