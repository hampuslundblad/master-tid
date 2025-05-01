import { getTimes } from "./lib/time";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { useState } from "react";
import { LockIcon, UnlockIcon } from "lucide-react";
import TimeTable from "./components/TimeTable";
import { extractYearMonthDay, isInvalidDate } from "./utils/date";
function App() {
  const [isDateError, setIsDateError] = useState(false);

  const [isStartDateError, setIsStartDateError] = useState(false);

  // Gammalt "2025-03-21T12:42:00.000Z"
  // 2025-04-23T07.54:00.000Z

  const [startDate, setStartDate] = useState<Date>(
    new Date("2025-04-30T10:15:00.000Z")
  );

  const [isStartInputDisabled, setIsStartInputDisabled] = useState(true);

  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().setHours(23, 0, 0, 0))
  );

  const { beforeLunchTimes, afterLunchTimes } = getTimes({
    startDate: startDate,
    endDate: endDate,
  });

  function handleStartDate(value: string) {
    if (isInvalidDate(value)) {
      setIsStartDateError(true);
      return;
    }

    const startDate = new Date(value);
    setStartDate(startDate);

    setIsStartDateError(false);
  }

  function handleEndDate(value: string) {
    if (isInvalidDate(value)) {
      setIsDateError(true);
      return;
    }

    if (isInvalidDate(value)) {
      setIsDateError(true);
      return;
    }

    const endDate = new Date(value);
    endDate.setHours(23, 0, 0, 0);
    setEndDate(endDate);

    setIsDateError(false);
  }

  return (
    <main className="py-12 lg:px-36 w-[100vw] h-[100vh] bg-teal-800">
      <div className="py-12 bg-white flex flex-col items-center rounded-xl backdrop-blur-3xl">
        <h1 className="text-2xl my-8"> När sker dosering?</h1>

        <div className="w-1/2 h-1/2">
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-bold mb-2"> Start datum</p>
              <div className="flex gap-4 items-center">
                <Input
                  defaultValue={startDate.toISOString()}
                  disabled={isStartInputDisabled}
                  onChange={(value) => handleStartDate(value.target.value)}
                />
                <div className="flex items-center gap-4">
                  <Checkbox
                    className="w-6 h-6"
                    onClick={() => setIsStartInputDisabled((prev) => !prev)}
                  />
                  {isStartInputDisabled ? (
                    <LockIcon className="w-4 h-4" />
                  ) : (
                    <UnlockIcon className="w-4 h-4" />
                  )}
                </div>
              </div>
              {isStartDateError && (
                <p className="text-red-500">
                  Datum måste vara i formatet yyyy-mm-dd:tt:mm:ss.xxxZ
                </p>
              )}
            </div>
            <div>
              <p className="font-bold mb-2"> Valt datum </p>
              <Input
                placeholder={extractYearMonthDay(endDate)}
                onChange={(value) => handleEndDate(value.target.value)}
              />
              {isDateError && (
                <p className="text-red-500">
                  Datum måste vara i formatet yyyy-mm-dd
                </p>
              )}
            </div>
          </div>
          <div className="mt-8">
            <TimeTable
              beforeLunchTimes={isDateError ? [] : beforeLunchTimes}
              afterLunchTimes={isDateError ? [] : afterLunchTimes}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
