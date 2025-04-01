export function isInvalidDate(date: string): boolean {
  return isNaN(Date.parse(date));
}
