"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "Applied", label: "Applied" },
  { value: "Screening", label: "Screening" },
  { value: "Interview", label: "Interview" },
  { value: "Offer", label: "Offer" },
  { value: "Rejected", label: "Rejected" },
];

const DATE_OPTIONS = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

interface ApplicationFiltersProps {
  filters: {
    status: string[];
    date: string;
  };
  setFilters: (filters: any) => void;
}

export function ApplicationFilters({
  filters,
  setFilters,
}: ApplicationFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select
        value={filters.date}
        onValueChange={(value) => setFilters({ ...filters, date: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          {DATE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((status) => (
          <Badge
            key={status.value}
            variant={
              filters.status.includes(status.value) ? "default" : "outline"
            }
            className="cursor-pointer"
            onClick={() => {
              if (filters.status.includes(status.value)) {
                setFilters({
                  ...filters,
                  status: filters.status.filter((s) => s !== status.value),
                });
              } else {
                setFilters({
                  ...filters,
                  status: [...filters.status, status.value],
                });
              }
            }}
          >
            {status.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
