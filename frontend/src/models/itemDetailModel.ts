import { ItemModel } from "./itemModel";

// Item Model fields 상속
export interface ItemDetailModel extends ItemModel {
  description: string;
  status: string;
  lostPlace: string;
  userName: string;
}
