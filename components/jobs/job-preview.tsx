import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, BriefcaseIcon, BuildingIcon } from "lucide-react";

interface JobPreviewProps {
  job: {
    title?: string;
    company?: string;
    location?: string;
    type?: string;
    experience?: string;
    salary?: {
      min: string;
      max: string;
    };
    description?: string;
    requirements?: string;
    benefits?: string;
    remote?: boolean;
    skills?: string;
  };
}

export function JobPreview({ job }: JobPreviewProps) {
  const formatSalary = (min: string, max: string) => {
    if (!min || !max) return "Competitive";
    return `$${parseInt(min).toLocaleString()} - $${parseInt(
      max
    ).toLocaleString()}`;
  };

  const formatSkills = (skills: string) => {
    if (!skills) return [];
    return skills.split(",").map((skill) => skill.trim());
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl">
              {job.title || "Job Title"}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <BuildingIcon className="h-4 w-4" />
                {job.company || "Company Name"}
              </span>
              <span className="flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                {job.location || "Location"}
              </span>
              <span className="flex items-center gap-1">
                <BriefcaseIcon className="h-4 w-4" />
                {job.type || "Job Type"}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {job.remote && <Badge>Remote</Badge>}
          <Badge variant="secondary">
            {job.experience || "Experience Level"}
          </Badge>
          <Badge variant="secondary">
            {formatSalary(job.salary?.min || "", job.salary?.max || "")}
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {job.description || "No description provided"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Requirements</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {job.requirements || "No requirements provided"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Benefits</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {job.benefits || "No benefits provided"}
            </p>
          </div>

          {job.skills && (
            <div>
              <h3 className="font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {formatSkills(job.skills).map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
