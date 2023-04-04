import { BoardModel } from "@/models/boardModel";
import { multipartClient } from "../httpClient";

// TODO: 수정중...
export interface CreateBoardArgs {
  formData: any;
}

export async function createBoard({ formData }: CreateBoardArgs) {
  const { data } = await multipartClient.post<BoardModel>(
    "/api/boards",
    formData
  );
  return data!;
}
