import { client } from "../httpClient";

interface SignupWithCompanyArgs {
  email: string;
  password: string;
  name: string;
  displayName: string;
  company: string;
}

export async function signupWithCompany({
  email,
  password,
  name,
  displayName,
  company,
}: SignupWithCompanyArgs): Promise<null> {
  await client.post("/api/users", {
    email,
    name,
    displayName,
    password,
    company,
  });
  return null;
}
