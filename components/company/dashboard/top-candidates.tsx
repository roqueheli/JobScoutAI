import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

const CANDIDATES = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    matchScore: 95,
    skills: ["React", "TypeScript", "Next.js"],
    experience: "8 years",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Frontend Developer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    matchScore: 92,
    skills: ["Vue.js", "JavaScript", "Node.js"],
    experience: "7 years",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Product Designer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    matchScore: 90,
    skills: ["Figma", "UI/UX", "Design Systems"],
    experience: "6 years",
  },
] as const;

export function TopCandidates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Candidates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {CANDIDATES.map((candidate) => (
            <div
              key={candidate.id}
              className="flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                  <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{candidate.name}</h3>
                    <Badge variant="secondary" className="gap-1">
                      <StarIcon className="h-3 w-3 fill-current" />
                      {candidate.matchScore}% match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {candidate.role} • {candidate.experience}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button variant="outline">View Profile</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
