"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideSearch } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search({
  categoryInit,
  searchInit,
}: {
  categoryInit?: string;
  searchInit?: string;
}) {
  const router = useRouter();
  const query = useSearchParams();
  const [search, setSearch] = useState(searchInit ?? "");
  const [category, setCategory] = useState(categoryInit ?? "track");

  const handleSumbit = (e: any) => {
    e.preventDefault();
    if (search.length > 0) {
      router.push(`/search/${category}/${search}`);
    } else {
      router.push(`/search/`);
    }
  };

  const params = new URLSearchParams(Array.from(query.entries()));

  return (
    <form className="relative" onSubmit={(e) => handleSumbit(e)}>
      <Select onValueChange={(e) => setCategory(e)} defaultValue={category}>
        <SelectTrigger className="absolute top-1/2 ml-2 h-auto w-24 -translate-y-1/2 truncate rounded-lg bg-slate-200 px-2 py-1 text-xs font-bold dark:bg-slate-800 dark:text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="track">Track</SelectItem>
            <SelectItem value="artist">Artist</SelectItem>
            <SelectItem value="album">Album</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        placeholder="search..."
        className="truncate bg-background pl-28 pr-10"
        onChange={(e) => setSearch(e.target.value)}
        defaultValue={params.get("search") || searchInit || ""}
      />
      <Button
        size="icon"
        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
        variant="default"
      >
        <LucideSearch size={20} />
      </Button>
    </form>
  );
}
