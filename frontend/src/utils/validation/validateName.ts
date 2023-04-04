export function validateName(name: string) {
  const isName = name.length >= 2 && name.length <= 15;
  return isName;
}
