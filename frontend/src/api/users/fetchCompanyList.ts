import { CompanyModel } from "@/models/companyModel";
import { client } from "../httpClient";

export async function fetchCompanyList() {
  const { data } = await client.get<CompanyModel[]>("/api/users/company");
  return data!;
}
