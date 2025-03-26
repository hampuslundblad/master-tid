// ISO
class Time {
  private date!: Date;

  constructor(date: Date) {
    this.date = date;
  }
  public addThousandSeconds(): void {
    this.date = new Date(this.date.getTime() + 1000 * 1000);
  }

  public toString(): string {
    return this.date.toISOString();
  }
}

export interface TimeConfig {
  startDate: Date;
  endDate: Date;
}

export function getTimes({ startDate, endDate }: TimeConfig) {
  const onlyGiveDatesOnThisDay = endDate.getUTCDate().toString();
  console.log(onlyGiveDatesOnThisDay);

  const time: Time = new Time(startDate);
  const times: string[] = [];

  const steps = getDifferenceInSeconds(startDate, endDate) / 1000;

  for (let i = 0; i < steps; i++) {
    time.addThousandSeconds();
    times.push(time.toString());
  }

  let beforeLunchTimes = times.filter(
    (x) =>
      x.includes("T07:") ||
      x.includes("T08:") ||
      x.includes("T09:") ||
      x.includes("T10:")
  );

  let afterLunchTimes = times.filter(
    (x) =>
      x.includes("T12:") ||
      x.includes("T13:") ||
      x.includes("T14:") ||
      x.includes("T15:")
  );

  beforeLunchTimes = beforeLunchTimes.filter((x) =>
    x.includes("03" + "-" + onlyGiveDatesOnThisDay)
  );

  afterLunchTimes = afterLunchTimes.filter((x) =>
    x.includes("03" + "-" + onlyGiveDatesOnThisDay)
  );

  return {
    beforeLunchTimes: beforeLunchTimes,
    afterLunchTimes: afterLunchTimes,
  };
}

function getDifferenceInSeconds(a: Date, b: Date) {
  return Math.floor((b.getTime() - a.getTime()) / 1000);
}
