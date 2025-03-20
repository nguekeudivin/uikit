"use client";

import { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Email } from "@/types/emails";
import { ListPagination } from "@/types/shared";

interface EmailListingTopPaginationProps {
  pagination: ListPagination<Email>;
  nextPage: () => void;
  previousPage: () => void;
}

const EmailListingTopPagination: FC<EmailListingTopPaginationProps> = ({
  pagination,
  nextPage,
  previousPage,
}) => {
  const from = () => {
    return (pagination.currentPage - 1) * pagination.perPage + 1;
  };

  const to = () => {
    return (
      from() +
      (pagination.currentPage == pagination.lastPage
        ? pagination.total -
          (pagination.currentPage - 1) * pagination.perPage -
          1
        : pagination.perPage - 1)
    );
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-x-1">
          <span>{from()}</span>
          <span>-</span>
          <span>{to()}</span>
          <span>of</span>
          <span> {pagination.total}</span>
        </div>
        <button className="ml-4" onClick={previousPage}>
          <ChevronLeft />
        </button>
        <button>
          <ChevronRight onClick={nextPage} />
        </button>
      </div>
    </>
  );
};

export default EmailListingTopPagination;
