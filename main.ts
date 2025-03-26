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

const onlyGiveDatesOnThisDay = "03-22T";

const startDate = new Date("2025-03-02T05:00:00.000Z");
const endDate = new Date("2025-03-25T20:00:00.000Z");

const time: Time = new Time(startDate);
const times: string[] = [];

const steps = getDifferenceInSeconds(startDate, endDate) / 1000;

for (let i = 0; i < steps; i++) {
  time.addThousandSeconds();
  times.push(time.toString());
}

const beforeLunchTimes = times.filter(
  (x) => x.includes("T07:") || x.includes("T08:") || x.includes("T09:")
);

const afterLunchTimes = times.filter(
  (x) => x.includes("T13:") || x.includes("T14:") || x.includes("T15:")
);

console.log(beforeLunchTimes.filter((x) => x.includes(onlyGiveDatesOnThisDay)));

console.log(afterLunchTimes.filter((x) => x.includes(onlyGiveDatesOnThisDay)));

function getDifferenceInSeconds(a: Date, b: Date) {
  return Math.floor((b.getTime() - a.getTime()) / 1000);
}
