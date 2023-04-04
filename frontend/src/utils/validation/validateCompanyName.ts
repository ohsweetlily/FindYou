export function validateCompanyName(companyName: string) {
  const isCompanyName = companyName.length >= 1;
  return isCompanyName;
}
