export function formatZeroPrefix(value: number, length = 2): string {
  return String(value).padStart(length, "0");
}
