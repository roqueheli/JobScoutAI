"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function JobSort() {
  return (
    <Select defaultValue="newest">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="oldest">Oldest First</SelectItem>
        <SelectItem value="salary-high">Salary: High to Low</SelectItem>
        <SelectItem value="salary-low">Salary: Low to High</SelectItem>
      </SelectContent>
    </Select>
  );
}
