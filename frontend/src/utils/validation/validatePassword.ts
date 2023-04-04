export function validatePassword(password: string) {
  const isPassword =
    /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(?=.*?[A-Za-z]).{8,20}$/.test(password);
  return isPassword;
}
