import { fetchCompanyList } from "@/api/users/fetchCompanyList";
import { CompanyModel } from "@/models/companyModel";
import { useQuery } from "@tanstack/react-query";

export function useCompanyList() {
  const { data, error, isLoading } = useQuery<CompanyModel[]>(
    ["users", "company"],
    fetchCompanyList,
    { initialData: [] } // 처음에 빈배열 넣어주기
  );

  return { companyList: data, error, isLoading };
}
