"use client";

import { useState } from "react";
import { JobFilters } from "@/components/jobs/job-filters";
import { JobList } from "@/components/jobs/job-list";
import { JobSort } from "@/components/jobs/job-sort";

export default function JobsPage() {
  const [filters, setFilters] = useState({
    type: [],
    location: [],
    experience: [],
    salary: "",
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Jobs</h1>
          <p className="text-muted-foreground">
            Find your next opportunity from our list of open positions
          </p>
        </div>

        <div className="flex items-center justify-between">
          <JobFilters filters={filters} setFilters={setFilters} />
          <JobSort />
        </div>

        <JobList filters={filters} />
      </div>
    </div>
  );
}
