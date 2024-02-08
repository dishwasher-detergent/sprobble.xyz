import { Loader } from "@/components/loading/loader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  page: number;
  pageCount: number;
  isLoading: boolean;
}

export function Pagination({ page, pageCount, isLoading }: PaginationProps) {
  const query = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const limitVal = query.get("limit")
    ? parseInt(query.get("limit") as string)
    : 12;

  const setQuery = (key: string, value: string) => {
    const params = new URLSearchParams(Array.from(query.entries()));
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const setLimit = (value: any) => {
    setQuery("limit", value);
  };

  const nextPage = () => {
    if (page == pageCount) return;

    const newPage = page + 1;

    setQuery("page", newPage.toString());
  };

  const prevPage = () => {
    if (page == 0) return;

    const newPage = page - 1;

    setQuery("page", newPage.toString());
  };

  return (
    <footer className="flex justify-end pt-8">
      <div className="flex items-center justify-between px-2 py-4">
        <div className="flex items-center space-x-6 lg:space-x-8">
          {isLoading && <Loader />}
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {page} of {pageCount}
          </div>
          <Select
            defaultValue={limitVal.toString()}
            onValueChange={(e) => setLimit(e)}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Select an Item Count" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="48">48</SelectItem>
                <SelectItem value="96">96</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => prevPage()}
              disabled={page === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <LucideChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => nextPage()}
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
