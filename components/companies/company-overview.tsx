import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";

interface CompanyOverviewProps {
  company: {
    description: string;
    benefits: string[];
    culture: string[];
    techStack: string[];
    socialLinks: {
      linkedin: string;
      twitter: string;
      github: string;
    };
  };
}

export function CompanyOverview({ company }: CompanyOverviewProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="space-y-6 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{company.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Culture & Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {company.culture.map((value) => (
                <Badge key={value} variant="secondary">
                  {value}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {company.techStack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Benefits & Perks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {company.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {benefit}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              asChild
            >
              <a
                href={company.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              asChild
            >
              <a
                href={company.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              asChild
            >
              <a
                href={company.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
