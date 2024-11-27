"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

const JOB_TYPES = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
];

const LOCATIONS = [
  { id: "remote", label: "Remote" },
  { id: "hybrid", label: "Hybrid" },
  { id: "on-site", label: "On-site" },
];

const EXPERIENCE_LEVELS = [
  { id: "entry", label: "Entry Level" },
  { id: "mid", label: "Mid Level" },
  { id: "senior", label: "Senior Level" },
  { id: "lead", label: "Lead" },
];

interface JobFiltersProps {
  filters: {
    type: string[];
    location: string[];
    experience: string[];
    salary: string;
  };
  setFilters: (filters: any) => void;
}

export function JobFilters({ filters, setFilters }: JobFiltersProps) {
  const activeFiltersCount =
    filters.type.length + filters.location.length + filters.experience.length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Jobs</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 py-6">
          <div>
            <h3 className="font-medium mb-4">Job Type</h3>
            <div className="space-y-3">
              {JOB_TYPES.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={filters.type.includes(type.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters,
                          type: [...filters.type, type.id],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          type: filters.type.filter((t) => t !== type.id),
                        });
                      }
                    }}
                  />
                  <label
                    htmlFor={type.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-4">Location</h3>
            <div className="space-y-3">
              {LOCATIONS.map((location) => (
                <div key={location.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={location.id}
                    checked={filters.location.includes(location.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters,
                          location: [...filters.location, location.id],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          location: filters.location.filter(
                            (l) => l !== location.id
                          ),
                        });
                      }
                    }}
                  />
                  <label
                    htmlFor={location.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {location.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-4">Experience Level</h3>
            <div className="space-y-3">
              {EXPERIENCE_LEVELS.map((level) => (
                <div key={level.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={level.id}
                    checked={filters.experience.includes(level.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters,
                          experience: [...filters.experience, level.id],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          experience: filters.experience.filter(
                            (e) => e !== level.id
                          ),
                        });
                      }
                    }}
                  />
                  <label
                    htmlFor={level.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {level.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
