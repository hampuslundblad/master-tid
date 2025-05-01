import {
  isInvalidDateFormat,
  isInvalidDate,
  extractYearMonthDay,
} from "@/utils/date";
import { expect, test } from "vitest";

test("isInvalidDate returns true if date is invalid", () => {
  expect(isInvalidDate("")).toBe(true);
  expect(isInvalidDate("a")).toBe(true);
  expect(isInvalidDate("2025-01-01-01")).toBe(true);
});

test("isInvalidDate returns false if date is valid", () => {
  expect(isInvalidDate("2025-01-01")).toBe(false);
  expect(isInvalidDate("2025-05-01T12:00:00Z")).toBe(false);
  expect(isInvalidDate("05/01/2025")).toBe(false);
  expect(isInvalidDate("May 1, 2025")).toBe(false);

  // Weird cases
  expect(isInvalidDate("123")).toBe(false);
  expect(isInvalidDate("-1")).toBe(false);
});

test("isInvalidDateFormat returns true of the date is invalid", () => {
  expect(isInvalidDateFormat("25")).toBe(true);
  expect(isInvalidDateFormat("25-01")).toBe(true);
  expect(isInvalidDateFormat("25-01-1")).toBe(true);
});

test("isInvalidDateFormat returns false if the date is  valid", () => {
  expect(isInvalidDateFormat("2025-01-01")).toBe(false);
});

test("extractYearMonthDay returns the correct YYYY-MM-DD format", () => {
  const date = new Date("2025-05-01T12:00:00Z");
  const result = extractYearMonthDay(date);
  expect(result).toBe("2025-05-01");
});

test("extractYearMonthDay handles single-digit months and days correctly", () => {
  const date = new Date("2025-03-04T08:00:00Z");
  const result = extractYearMonthDay(date);
  expect(result).toBe("2025-03-04");
});

test("extractYearMonthDay handles edge cases like end of year", () => {
  const date = new Date("2025-12-31T23:59:59Z");
  const result = extractYearMonthDay(date);
  expect(result).toBe("2025-12-31");
});
