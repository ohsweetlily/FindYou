import { UserModel } from "@/models/userModel";
import { client } from "../httpClient";

export async function fetchMe() {
  const { data } = await client.get<UserModel>("/api/users");
  return data;
}
