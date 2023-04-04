import { multipartClient } from "../httpClient";

export interface MyInfoArgs {
  image: File | undefined;
  email: string; // 변경x
  password: string;
  name: string;
  displayName: string;
}

export async function patchMyInfo({
  image,
  email,
  password,
  name,
  displayName,
}: MyInfoArgs) {
  const { data } = await multipartClient.patch("/api/users", {
    image,
    email,
    password,
    name,
    displayName,
  });
  return data;
}
