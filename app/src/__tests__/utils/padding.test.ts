import { padLeftSingleCharWithZero } from "@/utils/padding";
import { expect, test } from "vitest";

test("padding with one character", () => {
  expect(padLeftSingleCharWithZero("a")).toBe("0a");
});
test("doesn't pad characters longer than 1 ", () => {
  expect(padLeftSingleCharWithZero("ab")).toBe("ab");
});
