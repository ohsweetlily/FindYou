import { client } from "../httpClient";

export interface SignupArgs {
  email: string;
  password: string;
  name: string;
  displayName: string;
}

export async function signup({
  email,
  password,
  name,
  displayName,
}: SignupArgs) {
  await client.post("/api/users", {
    email,
    name,
    displayName,
    password,
  });
}
