import { BaseModel } from "./baseModel";

// TODO : 수정
export interface ItemModel extends BaseModel {
  name: string;
  getDate: string;
  userName?: string;
  takePlace: string;
  lostPlace?: string;
  imageUrl: string;
  status?: string;
  categoryName: string;
  description?: string;
}

export interface IntegrationItemModel {
  items: ItemModel[];
  totalItems: number;
  totalPages: number;
}
