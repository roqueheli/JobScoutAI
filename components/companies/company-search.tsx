"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface CompanySearchProps {
  search: string;
  setSearch: (search: string) => void;
}

export function CompanySearch({ search, setSearch }: CompanySearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
