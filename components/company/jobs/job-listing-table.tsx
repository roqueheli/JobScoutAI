"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Pencil,
  Copy,
  Archive,
  Trash2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";
import { differenceInDays } from "date-fns";
import Link from "next/link";
import { JobApplicantsList } from "./job-applicants-list";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// This would typically come from your API
const JOBS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: i % 2 === 0 ? "Senior Frontend Developer" : "Product Designer",
  department: i % 2 === 0 ? "engineering" : "design",
  location: i % 2 === 0 ? "remote" : "hybrid",
  type: "Full-time",
  status: ["active", "expired", "closed"][Math.floor(Math.random() * 3)],
  totalCandidates: Math.floor(Math.random() * 50) + 10,
  stages: [
    {
      name: "Applied",
      count: Math.floor(Math.random() * 30) + 10,
      deadline: "2024-03-20",
    },
    {
      name: "Screening",
      count: Math.floor(Math.random() * 17) + 5,
      deadline: "2024-03-25",
    },
    {
      name: "Interview",
      count: Math.floor(Math.random() * 10) + 2,
      deadline: "2024-04-05",
    },
    {
      name: "Offer",
      count: Math.floor(Math.random() * 3),
      deadline: "2024-04-15",
    },
    {
      name: "Scheduled",
      count: Math.floor(Math.random() * 3),
      deadline: "2024-12-31",
    },
  ],
  postedDate: "2024-02-15",
  expiryDate: "2024-04-15",
}));

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
  const [expandedApplicants, setExpandedApplicants] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleRepublish = (jobId: number) => {
    // Here you would typically make an API call to republish the job
    console.log(`Republishing job ${jobId}`);
  };

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
      {currentJobs.map((job) => (
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
              {(job.status === "expired" || job.status === "closed") && (
                <Button
                  variant="outline"
                  onClick={() => handleRepublish(job.id)}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Republish
                </Button>
              )}
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
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() =>
                    setExpandedJob(expandedJob === job.id ? null : job.id)
                  }
                >
                  {expandedJob === job.id ? (
                    <>
                      Hide Stages
                      <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View Stages
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() =>
                    setExpandedApplicants(
                      expandedApplicants === job.id ? null : job.id
                    )
                  }
                >
                  {expandedApplicants === job.id ? (
                    <>
                      Hide Applicants
                      <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View Applicants
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
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

            {expandedApplicants === job.id && (
              <JobApplicantsList jobId={job.id} />
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

      {filteredJobs.length > itemsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
