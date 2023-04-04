import { client } from "../httpClient";

export async function signout(): Promise<null> {
  await client.post("/api/auth/sign-out", {
    withCredentials: true,
  });
  return null;
}
