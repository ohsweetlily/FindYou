import { BaseModel } from "./baseModel";

export interface NewItemsModel extends BaseModel {
  name: string;
  status: string;
  categoryName: string;
  lostPlace: string;
  imageUrl: string;
}
