"use client";

import { JobListingFilters } from "@/components/company/jobs/job-listing-filters";
import { JobListingStats } from "@/components/company/jobs/job-listing-stats";
import { JobListingTable } from "@/components/company/jobs/job-listing-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CompanyJobsPage() {
  const [filters, setFilters] = useState({
    status: [],
    department: [],
    location: [],
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Listings</h1>
            <p className="text-muted-foreground">
              Manage your job postings and track applicants
            </p>
          </div>
          <Button asChild>
            <Link href="/company/post-job">
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Link>
          </Button>
        </div>

        <JobListingStats />

        <div className="flex items-center justify-between">
          <JobListingFilters filters={filters} setFilters={setFilters} />
        </div>

        <JobListingTable filters={filters} />
      </div>
    </div>
  );
}
