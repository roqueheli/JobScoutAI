"use client";

import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "closed", label: "Closed" },
  { value: "expired", label: "Expired" },
];

const DEPARTMENT_OPTIONS = [
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "product", label: "Product" },
];

const LOCATION_OPTIONS = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

interface JobListingFiltersProps {
  filters: {
    status: string[];
    department: string[];
    location: string[];
  };
  setFilters: (filters: any) => void;
}

export function JobListingFilters({
  filters,
  setFilters,
}: JobListingFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
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

      <Select
        value={filters.department[0]}
        onValueChange={(value) =>
          setFilters({ ...filters, department: [value] })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          {DEPARTMENT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.location[0]}
        onValueChange={(value) => setFilters({ ...filters, location: [value] })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          {LOCATION_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
