"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

const filterOptions = {
  skills: ["JavaScript", "React", "Node.js", "Python", "Java", "DevOps"],
  experience: ["Entry Level", "Mid Level", "Senior", "Lead", "Executive"],
  location: ["Remote", "On-site", "Hybrid"],
  availability: ["Immediate", "2 weeks", "1 month", "3 months"],
};

interface CandidatePoolFiltersProps {
  filters: {
    skills: string[];
    experience: string[];
    location: string[];
    availability: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      skills: string[];
      experience: string[];
      location: string[];
      availability: string[];
    }>
  >;
}

export function CandidatePoolFilters({
  filters,
  setFilters,
}: CandidatePoolFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search candidates..." className="pl-8" />
      </div>

      {Object.entries(filterOptions).map(([key, options]) => (
        <DropdownMenu key={key}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="capitalize">
              <Filter className="mr-2 h-4 w-4" />
              {key}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by {key}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {options.map((option) => (
              <DropdownMenuCheckboxItem
                key={option}
                checked={filters[key as keyof typeof filters].includes(option)}
                onCheckedChange={(checked) => {
                  setFilters((prev) => ({
                    ...prev,
                    [key]: checked
                      ? [...prev[key as keyof typeof filters], option]
                      : prev[key as keyof typeof filters].filter(
                          (item) => item !== option
                        ),
                  }));
                }}
              >
                {option}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );
}
