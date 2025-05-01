import { padLeftSingleCharWithZero } from "./padding";

export function isInvalidDate(date: string): boolean {
  return isNaN(Date.parse(date));
}
/***
 * Checks if the date is in the format YYYY-MM-DD
 *  ✅ "2023-10-05": Matches because it follows the YYYY-MM-DD format.
 * ❌ "23-10-05": Does not match because the year is not 4 digits.
 *
 */
export function isValidDateFormat(value: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(value);
}

export function isInvalidDateFormat(value: string): boolean {
  return !isValidDateFormat(value);
}

export function extractYearMonthDay(date: Date): string {
  const year = date.getUTCFullYear();
  const month = padLeftSingleCharWithZero((date.getUTCMonth() + 1).toString());
  const day = padLeftSingleCharWithZero(date.getUTCDate().toString());
  return `${year}-${month}-${day}`;
}
