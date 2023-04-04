import { NoticeItemModel } from "@/models/noticeItemModel";
import { client } from "../httpClient";

export async function fetchNoticeItem() {
  const { data } = await client.get<NoticeItemModel>("/api/main/items");
  return data!;
}
