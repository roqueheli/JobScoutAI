"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

const webinars = [
  {
    title: "Future of AI in Recruitment",
    description:
      "Explore how AI is transforming the recruitment landscape and what it means for your organization",
    date: "2024-04-15",
    time: "2:00 PM EST",
    speaker: "Dr. Emily Watson",
    role: "AI Research Director",
  },
  {
    title: "Building High-Performance Teams",
    description:
      "Learn strategies for identifying and hiring candidates who will drive team success",
    date: "2024-04-22",
    time: "1:00 PM EST",
    speaker: "James Martinez",
    role: "Leadership Coach",
  },
];

export function ResourceWebinars() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Upcoming Webinars</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {webinars.map((webinar) => (
          <Card key={webinar.title}>
            <CardHeader>
              <CardTitle>{webinar.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {webinar.description}
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  {webinar.date}
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  {webinar.time}
                </div>
                <div className="text-sm font-medium">
                  {webinar.speaker} • {webinar.role}
                </div>
              </div>
              <Button className="w-full">Register Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
