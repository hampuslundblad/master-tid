import { usePagination } from "@/hooks/usePagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./ui/table";
import { padLeftSingleCharWithZero } from "@/utils/padding";

interface TimeTableProps {
  beforeLunchTimes: string[];
  afterLunchTimes: string[];
}

const PAGE_SIZE = 22;

const TimeTable = ({ beforeLunchTimes, afterLunchTimes }: TimeTableProps) => {
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

  // Zip the arrays
  const allTimes = paginatedAfterLunchTimes.map((time, index) => ({
    beforeLunch: paginatedBeforeLunchTimes[index],
    afterLunch: time,
  }));

  return (
    <>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Förmiddag</TableHead>
            <TableHead> Eftermiddag</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allTimes.map((x) => (
            <TableRow>
              <TableCell> {extractTime(x.beforeLunch) ?? ""}</TableCell>
              <TableCell> {extractTime(x.afterLunch) ?? ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          {allTimes.length > PAGE_SIZE && currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={goToPreviousPage} />
            </PaginationItem>
          )}
          {allTimes.length > PAGE_SIZE && (
            <PaginationItem>
              <PaginationNext onClick={goToNextPage} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};

function extractTime(date: string) {
  const dateTime = new Date(date);
  const hours = dateTime.getUTCHours();
  const minutes = dateTime.getUTCMinutes();
  const seconds = dateTime.getUTCSeconds();
  return (
    padLeftSingleCharWithZero(hours.toString()) +
    ":" +
    padLeftSingleCharWithZero(minutes.toString()) +
    ":" +
    padLeftSingleCharWithZero(seconds.toString())
  );
}

function paginateArray<T>(array: T[], page: number, pageSize: number): T[] {
  const startIndex = (page - 1) * pageSize;
  if (startIndex >= array.length) {
    return [];
  }
  return array.slice(startIndex, Math.min(page * pageSize, array.length));
}

export default TimeTable;
