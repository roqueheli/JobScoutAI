import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase } from "lucide-react";
import Link from "next/link";

// This would typically come from your API based on the company ID
const COMPANY_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    description:
      "We're looking for a Senior Frontend Developer to join our team and help build the future of our product...",
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Backend Engineer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130k - $160k",
    posted: "1 week ago",
    description:
      "Join our backend team to help scale our infrastructure and build new features...",
    tags: ["Java", "Spring Boot", "AWS"],
  },
  {
    id: 3,
    title: "Product Designer",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $130k",
    posted: "3 days ago",
    description:
      "We're seeking a talented Product Designer to help create beautiful and functional user interfaces...",
    tags: ["Figma", "UI/UX", "Design Systems"],
  },
] as const;

interface CompanyJobsProps {
  companyId: string;
}

export function CompanyJobs({ companyId }: CompanyJobsProps) {
  return (
    <div className="space-y-4">
      {COMPANY_JOBS.map((job) => (
        <Card key={job.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.posted}
                  </span>
                </div>
              </div>
              <Button asChild>
                <Link href={`/jobs/${job.id}`}>Apply Now</Link>
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {job.description}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
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
    </div>
  );
}
