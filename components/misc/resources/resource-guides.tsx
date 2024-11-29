"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

const guides = [
  {
    title: "Complete Guide to Remote Hiring",
    description:
      "Learn best practices for recruiting, interviewing, and onboarding remote employees",
    category: "Remote Work",
    downloadCount: "2.3k",
  },
  {
    title: "Technical Interview Handbook",
    description:
      "Structured approach to conducting effective technical interviews",
    category: "Interviewing",
    downloadCount: "1.8k",
  },
  {
    title: "Diversity & Inclusion Hiring Guide",
    description:
      "Strategies for building diverse teams and inclusive hiring processes",
    category: "DEI",
    downloadCount: "3.1k",
  },
  {
    title: "AI Recruitment Implementation",
    description:
      "Step-by-step guide to implementing AI in your recruitment process",
    category: "Technology",
    downloadCount: "1.5k",
  },
];

export function ResourceGuides() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Hiring Guides</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <Card key={guide.title}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">
                  {guide.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  {guide.downloadCount} downloads
                </span>
              </div>
              <CardTitle className="text-xl">{guide.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{guide.description}</p>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Guide
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
