"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BuildingIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import { FEATURED_JOBS } from "../featured-jobs";
import Link from "next/link";

interface JobListProps {
  filters: {
    type: string[];
    location: string[];
    experience: string[];
    salary: string;
  };
}

export function JobList({ filters }: JobListProps) {
  // Filter jobs based on selected filters
  const filteredJobs = FEATURED_JOBS.filter((job) => {
    if (filters.type.length && !filters.type.includes(job.type)) return false;
    if (filters.location.length && !filters.location.includes(job.location))
      return false;
    if (
      filters.experience.length &&
      !filters.experience.includes(job.experience)
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {filteredJobs.map((job) => (
        <Card key={job.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="line-clamp-1">{job.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BuildingIcon className="h-4 w-4" />
                    {job.company.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {job.posted}
                  </span>
                </div>
              </div>
              <Button>
                <Link href={`/jobs/${job.id}`}>Apply Now</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {job.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{job.type}</Badge>
              <Badge variant="secondary">{job.salary}</Badge>
              {job.skills.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No jobs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to find more opportunities
          </p>
        </div>
      )}
    </div>
  );
}
