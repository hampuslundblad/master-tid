import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { getTimes } from "./lib/time";
import { usePagination } from "./hooks/usePagination";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { useState } from "react";
function App() {
  const startDate = new Date("2025-03-21T12:42:00.000Z");
  // const endDate = new Date("2025-03-24T20:00:00.000Z");

  const [isDateError, setIsDateError] = useState(false);

  const [endDate, setEndDate] = useState<Date>(new Date());

  const PAGE_SIZE = 22;

  const { beforeLunchTimes, afterLunchTimes } = getTimes({
    startDate: startDate,
    endDate: endDate,
  });

  const { currentPage, goToNextPage, goToPreviousPage } = usePagination();
  const paginatedBeforeLunchTimes = paginateArray(
    beforeLunchTimes,
    currentPage,
    PAGE_SIZE
  );

  const paginatedAfterLunchTimes = paginateArray(
    afterLunchTimes,
    currentPage,
    PAGE_SIZE
  );

  const allTimes = paginatedAfterLunchTimes.map((time, index) => ({
    beforeLunch: paginatedBeforeLunchTimes[index],
    afterLunch: time,
  }));

  function paginateArray<T>(array: T[], page: number, pageSize: number): T[] {
    const startIndex = (page - 1) * pageSize;
    if (startIndex >= array.length) {
      return [];
    }
    return array.slice(startIndex, Math.min(page * pageSize, array.length));
  }
  function handleEndDate(value: string) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) {
      setIsDateError(true);
      return;
    }
    try {
      const endDate = new Date(value);
      endDate.setHours(23, 0, 0, 0);
      console.log(endDate.toISOString());
      setEndDate(endDate);
    } catch {
      setIsDateError(true);
    }

    setIsDateError(false);
    console.log(value);
  }

  return (
    <main>
      <div className="w-1/2 h-1/2">
        <div className="flex flex-col gap-4 w-96">
          <div>
            <p> Start datum</p>
            <div className="flex gap-4 items-center">
              <Input placeholder={"2025-03-02T:05:00:00.0000Z"} disabled />
              <Checkbox className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p> Valt datum </p>
            <Input onChange={(value) => handleEndDate(value.target.value)} />
            {isDateError && (
              <p className="text-red-500">
                {" "}
                Datum måste vara i formatet yyyy-mm-dd
              </p>
            )}
          </div>
        </div>

        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Förmiddag</TableHead>
              <TableHead> Eftermiddag</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {paginatedBeforeLunchTimes.map((time) => (
              <TableRow key={time}>
                <TableCell>{extractTime(time)}</TableCell>
              </TableRow>
            ))} */}
            {!isDateError &&
              allTimes.map((x) => (
                <TableRow>
                  <TableCell> {extractTime(x.beforeLunch) ?? ""}</TableCell>
                  <TableCell> {extractTime(x.afterLunch) ?? ""}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={goToPreviousPage} />
            </PaginationItem>
            {
              <PaginationItem>
                <PaginationNext onClick={goToNextPage} />
              </PaginationItem>
            }
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}

function extractTime(date: string) {
  const dateTime = new Date(date);
  const hours = dateTime.getUTCHours();
  const minutes = dateTime.getUTCMinutes();
  const seconds = dateTime.getUTCSeconds();
  return (
    padSingleCharWithZero(hours.toString()) +
    ":" +
    padSingleCharWithZero(minutes.toString()) +
    ":" +
    padSingleCharWithZero(seconds.toString())
  );
}

function padSingleCharWithZero(s: string) {
  if (s.length == 1) {
    return "0" + s;
  }
  return s;
}

export default App;
