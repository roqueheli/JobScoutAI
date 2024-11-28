"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, FileText, Users, Video } from "lucide-react";
import Link from "next/link";

const resources = [
  {
    icon: FileText,
    title: "Resume Templates",
    description: "Professional templates for different industries",
    href: "/resume-builder",
  },
  {
    icon: Video,
    title: "Interview Prep",
    description: "Mock interviews and common questions",
    href: "/career-advice/interviews",
  },
  {
    icon: BookOpen,
    title: "Career Guides",
    description: "In-depth guides for career transitions",
    href: "/career-advice/guides",
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Connect with industry mentors",
    href: "/career-advice/mentorship",
  },
];

export function CareerResources() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Career Resources</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Card key={resource.title}>
              <CardHeader>
                <Icon className="h-8 w-8 mb-2" />
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {resource.description}
                </p>
                <Button asChild variant="ghost" className="w-full">
                  <Link href={resource.href}>
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
