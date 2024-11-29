"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Archive,
  ArrowRight,
  Building,
  Calendar,
  CalendarPlus,
  MoreVertical,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ApplicationPagination } from "./application-pagination";
import { ApplicationTimeline } from "./application-timeline";
import { ScheduleInterviewDialog } from "./schedule-interview-dialog";

// This would typically come from your API
const APPLICATIONS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  jobTitle: "Senior Frontend Developer",
  company: {
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=100&auto=format&fit=crop",
  },
  appliedDate: "2024-03-01",
  status: ["Applied", "Screening", "Interview", "Offer", "Rejected"][
    Math.floor(Math.random() * 5)
  ],
  nextStep: "Technical Interview scheduled for March 15, 2024",
  archived: false,
  timeline: [
    {
      date: "2024-03-01",
      title: "Application Submitted",
      description: "Your application has been received",
    },
    {
      date: "2024-03-05",
      title: "Resume Screened",
      description: "Your resume has passed initial screening",
    },
    {
      date: "2024-03-10",
      title: "First Interview",
      description: "Completed first round interview with HR",
    },
  ],
}));

const STATUS_STYLES = {
  Applied: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  Screening:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  Interview:
    "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
  Offer: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
};

interface ApplicationListProps {
  filters: {
    status: string[];
    date: string;
    archived?: boolean;
  };
}

export function ApplicationList({ filters }: ApplicationListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedApplication, setExpandedApplication] = useState<number | null>(
    null
  );
  const [scheduleInterview, setScheduleInterview] = useState<{
    open: boolean;
    applicationId: number | null;
    companyName: string;
    jobTitle: string;
  }>({
    open: false,
    applicationId: null,
    companyName: "",
    jobTitle: "",
  });
  const itemsPerPage = 5;

  // Filter and paginate applications
  const filteredApplications = APPLICATIONS.filter((app) => {
    if (filters.status.length && !filters.status.includes(app.status))
      return false;
    if (
      typeof filters.archived === "boolean" &&
      app.archived !== filters.archived
    )
      return false;
    return true;
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      {paginatedApplications.map((application) => (
        <Card
          key={application.id}
          className="hover:shadow-md transition-shadow"
        >
          <CardHeader className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={application.company.logo}
                    alt={application.company.name}
                  />
                  <AvatarFallback>{application.company.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{application.jobTitle}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {application.company.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Applied {application.appliedDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    STATUS_STYLES[
                      application.status as keyof typeof STATUS_STYLES
                    ]
                  }
                  variant="secondary"
                >
                  {application.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Job Details</DropdownMenuItem>
                    <DropdownMenuItem>Contact Recruiter</DropdownMenuItem>
                    {application.status === "Interview" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            setScheduleInterview({
                              open: true,
                              applicationId: application.id,
                              companyName: application.company.name,
                              jobTitle: application.jobTitle,
                            })
                          }
                        >
                          <CalendarPlus className="mr-2 h-4 w-4" />
                          Schedule Interview
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive Application
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Withdraw Application
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-4">
              {application.nextStep && (
                <div className="text-sm">
                  <span className="font-medium">Next Step:</span>{" "}
                  {application.nextStep}
                </div>
              )}

              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() =>
                  setExpandedApplication(
                    expandedApplication === application.id
                      ? null
                      : application.id
                  )
                }
              >
                View Timeline
                <ArrowRight
                  className={`h-4 w-4 transition-transform ${
                    expandedApplication === application.id ? "rotate-90" : ""
                  }`}
                />
              </Button>

              {expandedApplication === application.id && (
                <ApplicationTimeline timeline={application.timeline} />
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {paginatedApplications.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No applications found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or browse new jobs
          </p>
          <Button className="mt-4" asChild>
            <Link href="/jobs">Browse Jobs</Link>
          </Button>
        </div>
      )}

      {filteredApplications.length > itemsPerPage && (
        <ApplicationPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <ScheduleInterviewDialog
        open={scheduleInterview.open}
        onOpenChange={(open) =>
          setScheduleInterview((prev) => ({ ...prev, open }))
        }
        applicationId={scheduleInterview.applicationId!}
        companyName={scheduleInterview.companyName}
        jobTitle={scheduleInterview.jobTitle}
      />
    </div>
  );
}
