import { Button } from "@/components/ui/button";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";

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
    <footer className="flex justify-end">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {page} of {pageCount}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => previous()}
              disabled={page === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <LucideChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => next()}
              disabled={page === pageCount}
            >
              <span className="sr-only">Go to next page</span>
              <LucideChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
