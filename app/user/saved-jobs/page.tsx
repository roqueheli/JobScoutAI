"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Bookmark,
    Building,
    Clock,
    ExternalLink,
    MapPin,
    MoreVertical,
    Share2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// This would typically come from your API
const SAVED_JOBS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: i % 2 === 0 ? "Senior Frontend Developer" : "Product Designer",
  company: {
    name: i % 2 === 0 ? "TechCorp" : "DesignStudio",
    logo: `https://images.unsplash.com/photo-${
      i % 2 === 0 ? "1611162617474-5b21e879e113" : "1680795456548-92f85b44f7c7"
    }?q=80&w=100&auto=format&fit=crop`,
  },
  location: i % 2 === 0 ? "Remote" : "San Francisco, CA",
  type: i % 2 === 0 ? "Full-time" : "Contract",
  salary: i % 2 === 0 ? "$120k - $150k" : "$100k - $130k",
  savedAt: "2024-03-15",
  description:
    i % 2 === 0
      ? "We're looking for a Senior Frontend Developer to join our team and help build the future of our product..."
      : "Join our design team to create beautiful and functional user interfaces...",
  tags:
    i % 2 === 0
      ? ["React", "TypeScript", "Next.js"]
      : ["Figma", "UI/UX", "Design Systems"],
}));

export default function SavedJobsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = SAVED_JOBS.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(SAVED_JOBS.length / itemsPerPage);

  const removeFromSaved = (jobId: number) => {
    // Here you would typically make an API call to remove the job from saved
    console.log(`Removing job ${jobId} from saved`);
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Saved Jobs</h1>
          <p className="text-muted-foreground">
            Review and manage your saved job opportunities
          </p>
        </div>

        <div className="space-y-4">
          {currentJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={job.company.logo}
                        alt={job.company.name}
                      />
                      <AvatarFallback>{job.company.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {job.company.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Saved {job.savedAt}
                        </span>
                      </div>
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
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/jobs/${job.id}`}
                            className="flex items-center"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open Job
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share Job
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center text-destructive"
                          onClick={() => removeFromSaved(job.id)}
                        >
                          <Bookmark className="mr-2 h-4 w-4" />
                          Remove from Saved
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{job.type}</Badge>
                  <Badge variant="secondary">{job.salary}</Badge>
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {currentJobs.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No saved jobs</h3>
              <p className="text-muted-foreground">
                Jobs you save will appear here
              </p>
              <Button className="mt-4" asChild>
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
            </div>
          )}

          {SAVED_JOBS.length > itemsPerPage && (
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

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
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
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}
