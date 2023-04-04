import { BaseModel } from "./baseModel";

export interface BoardModel extends BaseModel {
  name: string;
  userName: string;
  categoryName: string;
}

export interface IntegrationBoardModel {
  boards: BoardModel[];
  totalBoards: number;
  totalPages: number;
}
