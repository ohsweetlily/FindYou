import { client } from "../httpClient";

export async function withdrawal(): Promise<null> {
  await client.delete("/api/users", {
    withCredentials: true,
  });
  return null;
}
