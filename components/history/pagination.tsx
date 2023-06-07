import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationProps {
  next: () => void;
  previous: () => void;
  page: number;
  pageCount: number;
  resultCount: number;
  itemCount: number;
}

export function Pagination({
  next,
  previous,
  page,
  pageCount,
  resultCount,
  itemCount,
}: PaginationProps) {
  return (
    <footer className="flex items-center justify-between bg-white px-4 py-6 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          disabled={page === 1}
          onClick={previous}
          variant="ghost"
          className="border"
        >
          Previous
        </Button>
        <Button
          disabled={page === pageCount}
          onClick={next}
          variant="ghost"
          className="border"
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-lg shadow-sm"
            aria-label="Pagination"
          >
            <Button
              size="sm"
              disabled={page === 1}
              onClick={previous}
              variant="ghost"
              className="rounded-r-none border"
            >
              <span className="sr-only">Previous</span>
              <LucideChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              size="sm"
              disabled={page === pageCount}
              onClick={next}
              variant="ghost"
              className="rounded-l-none border"
            >
              <span className="sr-only">Next</span>
              <LucideChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </nav>
        </div>
        <div>
          <p className="text-sm text-slate-700">
            Showing{" "}
            <span className="font-medium">
              {page * itemCount - (itemCount - 1)}
            </span>{" "}
            to <span className="font-medium">{page === pageCount ? resultCount : page * itemCount}</span> of{" "}
            <span className="font-medium">{resultCount}</span> results
          </p>
        </div>
      </div>
    </footer>
  );
}
