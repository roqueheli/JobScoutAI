"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const INDUSTRIES = [
  { id: "tech", label: "Technology" },
  { id: "finance", label: "Finance" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "ecommerce", label: "E-commerce" },
];

const COMPANY_SIZES = [
  { id: "1-10", label: "1-10 employees" },
  { id: "11-50", label: "11-50 employees" },
  { id: "51-200", label: "51-200 employees" },
  { id: "201-500", label: "201-500 employees" },
  { id: "501-1000", label: "501-1000 employees" },
  { id: "1000+", label: "1000+ employees" },
];

const LOCATIONS = [
  { id: "remote", label: "Remote First" },
  { id: "us", label: "United States" },
  { id: "uk", label: "United Kingdom" },
  { id: "eu", label: "Europe" },
  { id: "asia", label: "Asia" },
];

interface CompanyFiltersProps {
  filters: {
    industry: string[];
    services: string[];
    size: string[];
    location: string[];
  };
  setFilters: (filters: any) => void;
}

export function CompanyFilters({ filters, setFilters }: CompanyFiltersProps) {
  const activeFiltersCount =
    filters.industry.length + filters.size.length + filters.location.length + filters.services.length;

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
          <SheetTitle>Filter Companies</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 py-6">
          <div>
            <h3 className="font-medium mb-4">Industry</h3>
            <div className="space-y-3">
              {INDUSTRIES.map((industry) => (
                <div key={industry.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={industry.id}
                    checked={filters.industry.includes(industry.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters,
                          industry: [...filters.industry, industry.id],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          industry: filters.industry.filter(
                            (i) => i !== industry.id
                          ),
                        });
                      }
                    }}
                  />
                  <label
                    htmlFor={industry.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {industry.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-4">Company Size</h3>
            <div className="space-y-3">
              {COMPANY_SIZES.map((size) => (
                <div key={size.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={size.id}
                    checked={filters.size.includes(size.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters,
                          size: [...filters.size, size.id],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          size: filters.size.filter((s) => s !== size.id),
                        });
                      }
                    }}
                  />
                  <label
                    htmlFor={size.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {size.label}
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
