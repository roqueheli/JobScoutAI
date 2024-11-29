"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Calculator,
    ClipboardCheck,
    FileText,
    MessageSquare,
} from "lucide-react";
import Link from "next/link";

const tools = [
  {
    icon: FileText,
    title: "Job Description Generator",
    description:
      "AI-powered tool to create compelling and inclusive job descriptions",
    href: "/tools/job-description",
  },
  {
    icon: Calculator,
    title: "Salary Calculator",
    description:
      "Compare market rates and build competitive compensation packages",
    href: "/tools/salary-calculator",
  },
  {
    icon: ClipboardCheck,
    title: "Interview Scorecard",
    description:
      "Standardized evaluation forms for consistent candidate assessment",
    href: "/tools/scorecard",
  },
  {
    icon: MessageSquare,
    title: "Email Templates",
    description:
      "Professional templates for candidate communication throughout the hiring process",
    href: "/tools/email-templates",
  },
];

export function ResourceTools() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Recruitment Tools</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card key={tool.title}>
              <CardHeader>
                <Icon className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="text-lg">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{tool.description}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={tool.href}>Try Tool</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
