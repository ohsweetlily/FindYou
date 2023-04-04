import { BaseModel } from "./baseModel";

export interface UserModel extends BaseModel {
  email: string;
  name: string;
  displayName: string;
  imageUrl: string;
  reward: number;
  company?: string;
}
