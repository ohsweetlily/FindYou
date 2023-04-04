export function validateDisplayName(displayName: string) {
  const isDisplayName = displayName.length >= 1 && displayName.length <= 15;
  return isDisplayName;
}
