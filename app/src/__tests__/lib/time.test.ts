import { getTimes } from "@/lib/time";
import { expect, test } from "vitest";

test("getTimes returns the correct number of dates", () => {
  const expectedBeforeLunchTimes = [
    "2025-05-04T07:14:00.000Z",
    "2025-05-04T07:30:40.000Z",
    "2025-05-04T07:47:20.000Z",
    "2025-05-04T08:04:00.000Z",
    "2025-05-04T08:20:40.000Z",
    "2025-05-04T08:37:20.000Z",
    "2025-05-04T08:54:00.000Z",
    "2025-05-04T09:10:40.000Z",
    "2025-05-04T09:27:20.000Z",
    "2025-05-04T09:44:00.000Z",
    "2025-05-04T10:00:40.000Z",
    "2025-05-04T10:17:20.000Z",
    "2025-05-04T10:34:00.000Z",
    "2025-05-04T10:50:40.000Z",
  ];

  const expectedAfterLunchTimes = [
    "2025-05-04T12:14:00.000Z",
    "2025-05-04T12:30:40.000Z",
    "2025-05-04T12:47:20.000Z",
    "2025-05-04T13:04:00.000Z",
    "2025-05-04T13:20:40.000Z",
    "2025-05-04T13:37:20.000Z",
    "2025-05-04T13:54:00.000Z",
    "2025-05-04T14:10:40.000Z",
    "2025-05-04T14:27:20.000Z",
    "2025-05-04T14:44:00.000Z",
    "2025-05-04T15:00:40.000Z",
    "2025-05-04T15:17:20.000Z",
    "2025-05-04T15:34:00.000Z",
    "2025-05-04T15:50:40.000Z",
  ];

  const startDate = "2025-04-23T07:54:00.000Z";
  const endDate = "2025-05-04T20:00:00";
  const config = {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  };
  const result = getTimes(config);

  expect(result.beforeLunchTimes).toEqual(expectedBeforeLunchTimes);
  expect(result.afterLunchTimes).toEqual(expectedAfterLunchTimes);
});

test("times in beforeLunchTimes and afterLunchTimes are in 1000 second intervals", () => {
  const startDate = "2025-03-04T07:00:00.000Z";
  const endDate = "2025-05-04T23:00:00.000Z";
  const config = {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  };
  const result = getTimes(config);

  // Check that the intervals between the times are 1000 secoonds
  const validateIntervals = (times: string[]) => {
    const timestamps = times.map((time) => new Date(time).getTime());
    for (let i = 1; i < timestamps.length; i++) {
      const interval = (timestamps[i] - timestamps[i - 1]) / 1000;
      expect(interval).toBe(1000);
    }
  };

  validateIntervals(result.beforeLunchTimes);
  validateIntervals(result.afterLunchTimes);
});

test("getTimes handles empty result when no times match", () => {
  const startDate = "2025-05-04T16:00:00.000Z";
  const endDate = "2025-05-04T18:00:00.000Z";
  const config = {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  };
  const result = getTimes(config);

  expect(result.beforeLunchTimes).toEqual([]);
  expect(result.afterLunchTimes).toEqual([]);
});

test("getTimes handles large date ranges correctly", () => {
  const startDate = "2025-01-01T07:00:00.000Z";
  const endDate = "2025-12-31T20:00:00.000Z";
  const config = {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  };
  const result = getTimes(config);

  expect(result.beforeLunchTimes.length).toBeGreaterThan(0);
  expect(result.afterLunchTimes.length).toBeGreaterThan(0);
});
