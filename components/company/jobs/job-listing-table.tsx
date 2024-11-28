"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { differenceInDays } from "date-fns";
import { Archive, Copy, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// This would typically come from your API
const JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "engineering",
    location: "remote",
    type: "Full-time",
    status: "active",
    totalCandidates: 45,
    stages: [
      {
        name: "Applied",
        count: 45,
        deadline: "2024-03-20",
      },
      {
        name: "Screening",
        count: 28,
        deadline: "2024-03-25",
      },
      {
        name: "Interview",
        count: 12,
        deadline: "2024-04-05",
      },
      {
        name: "Offer",
        count: 3,
        deadline: "2024-04-15",
      },
    ],
    postedDate: "2024-02-15",
    expiryDate: "2024-04-15",
  },
  {
    id: 2,
    title: "Product Designer",
    department: "design",
    location: "hybrid",
    type: "Full-time",
    status: "active",
    totalCandidates: 32,
    stages: [
      {
        name: "Applied",
        count: 32,
        deadline: "2024-03-18",
      },
      {
        name: "Screening",
        count: 20,
        deadline: "2024-03-22",
      },
      {
        name: "Interview",
        count: 8,
        deadline: "2024-04-01",
      },
    ],
    postedDate: "2024-02-20",
    expiryDate: "2024-04-20",
  },
] as const;

const STATUS_STYLES = {
  active: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  draft:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  closed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  expired: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
};

interface JobListingTableProps {
  filters: {
    status: string[];
    department: string[];
    location: string[];
  };
}

export function JobListingTable({ filters }: JobListingTableProps) {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const filteredJobs = JOBS.filter((job) => {
    if (filters.status.length && !filters.status.includes(job.status))
      return false;
    if (
      filters.department.length &&
      !filters.department.includes(job.department)
    )
      return false;
    if (filters.location.length && !filters.location.includes(job.location))
      return false;
    return true;
  });

  const getDaysUntilDeadline = (deadline: string) => {
    const daysLeft = differenceInDays(new Date(deadline), new Date());
    return daysLeft;
  };

  const getDeadlineColor = (daysLeft: number) => {
    if (daysLeft <= 2) return "text-red-500";
    if (daysLeft <= 5) return "text-yellow-500";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-4">
      {filteredJobs.map((job) => (
        <Card key={job.id} className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{job.title}</h3>
                <Badge
                  className={
                    STATUS_STYLES[job.status as keyof typeof STATUS_STYLES]
                  }
                >
                  {job.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{job.department}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href={`/jobs/${job.id}`}>View Job</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Job
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive Job
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Job
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="secondary">
                  {job.totalCandidates} candidates
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Posted on {job.postedDate}
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={() =>
                  setExpandedJob(expandedJob === job.id ? null : job.id)
                }
              >
                {expandedJob === job.id ? "Hide Stages" : "View Stages"}
              </Button>
            </div>

            {expandedJob === job.id && (
              <div className="space-y-2">
                {job.stages.map((stage) => {
                  const progress = (stage.count / job.totalCandidates) * 100;
                  const daysLeft = getDaysUntilDeadline(stage.deadline);
                  const deadlineColor = getDeadlineColor(daysLeft);

                  return (
                    <div key={stage.name} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{stage.name}</span>
                        <span className={deadlineColor}>
                          {daysLeft} days left
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={progress} className="h-2" />
                        <span className="text-sm text-muted-foreground w-12">
                          {stage.count}/{job.totalCandidates}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      ))}

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No jobs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or post a new job
          </p>
          <Button className="mt-4" asChild>
            <Link href="/post-job">Post New Job</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
