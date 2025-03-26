import { useState } from "react";

export const usePagination = () => {
  const STARTING_INDEX = 1;
  const [currentPage, setCurrentPage] = useState(STARTING_INDEX);

  const goToPreviousPage = () => {
    if (currentPage == STARTING_INDEX) {
      return;
    }

    setCurrentPage((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return {
    currentPage,
    goToPreviousPage,
    goToNextPage,
  };
};
