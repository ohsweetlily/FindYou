export function validateConfirmPassword(
  password: string,
  confirmPassword: string
) {
  return confirmPassword.length === 0 || password === confirmPassword;
}
