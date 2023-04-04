import { UserModel } from "./userModel";

export interface UserWithCompanyModel extends UserModel {
  company?: string;
}

export interface UserWithCompanyResponse {
  user: UserWithCompanyModel;
}
