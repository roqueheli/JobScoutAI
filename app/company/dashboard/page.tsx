"use client";

import { DashboardStats } from "@/components/company/dashboard/dashboard-stats";
import { JobApplicationsChart } from "@/components/company/dashboard/job-applications-chart";
import { JobStagesList } from "@/components/company/dashboard/job-stages-list";
import { TopCandidates } from "@/components/company/dashboard/top-candidates";

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your recruitment activities and candidate pipeline
          </p>
        </div>

        <DashboardStats />

        <div className="grid gap-6 lg:grid-cols-2">
          <JobApplicationsChart />
          <JobStagesList />
        </div>

        <TopCandidates />
      </div>
    </div>
  );
}
