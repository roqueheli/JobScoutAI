"use client";

import { CandidatePoolFilters } from "@/components/company/candidate-pool/candidate-pool-filters";
import { CandidatePoolStats } from "@/components/company/candidate-pool/candidate-pool-stats";
import { CandidatePoolTable } from "@/components/company/candidate-pool/candidate-pool-table";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CandidatePoolPage() {
  const [filters, setFilters] = useState({
    skills: [],
    experience: [],
    location: [],
    availability: [],
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Candidate Pool
            </h1>
            <p className="text-muted-foreground">
              Browse and manage your talent pipeline
            </p>
          </div>
          <Button asChild>
            <Link href="/add-candidate">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Candidate
            </Link>
          </Button>
        </div>

        <CandidatePoolStats />

        <div className="flex items-center justify-between">
          <CandidatePoolFilters filters={filters} setFilters={setFilters} />
        </div>

        <CandidatePoolTable filters={filters} />
      </div>
    </div>
  );
}
