"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Briefcase, Target, Users } from "lucide-react";
import Link from "next/link";

const topics = [
  {
    icon: BookOpen,
    title: "Learning & Development",
    description: "Skills and certifications to advance your career",
    href: "/career-advice/learning",
  },
  {
    icon: Briefcase,
    title: "Job Search Strategy",
    description: "Tips for finding and landing your dream job",
    href: "/career-advice/job-search",
  },
  {
    icon: Target,
    title: "Career Planning",
    description: "Map out your career path and goals",
    href: "/career-advice/planning",
  },
  {
    icon: Users,
    title: "Workplace Success",
    description: "Navigate workplace relationships and culture",
    href: "/career-advice/workplace",
  },
];

export default function CareerTopics() {
  return (
    <div className="container py-8 flex flex-col">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Salary Guide</h1>
        <p className="text-muted-foreground">
          Explore salary insights and trends for your career path
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Link key={topic.title} href={topic.href}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="pt-6">
                  <Icon className="h-8 w-8 mb-4" />
                  <h3 className="font-semibold mb-2">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {topic.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
