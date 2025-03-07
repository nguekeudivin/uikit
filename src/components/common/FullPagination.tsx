import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "../ui/button";

interface FullPaginationProps {
  pagination: any;
  canEdit?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onGoto?: (pageNumber: number) => void;
  onPerPage?: (value: number) => void;
}

const FullPagination: FC<FullPaginationProps> = ({
  pagination,
  canEdit = false,
  onPrevious,
  onNext,
  onGoto,
  onPerPage = (value: number) => {},
}) => {
  const previous = () => {
    window.scroll({ top: 0, behavior: "smooth" });
    if (onPrevious) onPrevious();
  };

  const next = () => {
    window.scroll({ top: 0, behavior: "smooth" });
    if (onNext) onNext();
  };

  const goTo = (pageNumber: number) => {
    window.scroll({ top: 0, behavior: "smooth" });
    if (onGoto) onGoto(pageNumber);
  };

  const [perPage, setPerPage] = useState<number>(pagination.perPage);

  return (
    <div className="flex items-center  justify-between">
      {canEdit && (
        <div className="flex items-center space-x-3">
          <span className="text-muted-foreground">Showing</span>
          <select
            className="px-4 py-2 bg-gray-100 rounded-lg"
            value={perPage}
            onChange={(e: any) => {
              setPerPage(e.target.value);
            }}
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={pagination.total}>All</option>
          </select>
          {pagination.perPage != perPage && (
            <Button onClick={() => onPerPage(perPage)}> Show </Button>
          )}
          <span className="text-muted-foreground"> of {pagination.total}</span>
        </div>
      )}

      <ul className="flex items-center h-10 text-base space-x-2">
        {pagination.currentPage != 1 ? (
          <li>
            <button
              onClick={previous}
              className="p-2 hover:bg-gray-200 text-muted-foreground rounded-full"
            >
              <ChevronLeft />
            </button>
          </li>
        ) : null}

        {Array.from({
          length: pagination.lastPage,
        })
          .map((_, index) => index + 1)
          .map((pageNumber) => (
            <li key={`pageNumber${pageNumber}`}>
              <button
                onClick={() => goTo(pageNumber)}
                className={clsx(
                  "w-8 h-8 inline-flex items-center justify-center rounded-full font-semibold",
                  {
                    "bg-white": pagination.currentPage != pageNumber,
                    "bg-gray-900 text-white":
                      pagination.currentPage == pageNumber,
                  }
                )}
              >
                {pageNumber}
              </button>
            </li>
          ))}

        {pagination.currentPage != pagination.lastPage ? (
          <li>
            <button
              onClick={next}
              className="p-1 hover:bg-gray-200 text-muted-foreground rounded-full"
            >
              <ChevronRight />
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default FullPagination;
