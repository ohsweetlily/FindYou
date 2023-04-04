export function validateEmail(email: string) {
  const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  return isEmail;
}
