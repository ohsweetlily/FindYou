import { client } from "../httpClient";

interface SignInArgs {
  email: string;
  password: string;
}

export async function signin({ email, password }: SignInArgs): Promise<null> {
  await client.post(
    "/api/auth/sign-in",
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return null;
}
