"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description:
      "Our advanced AI algorithms match candidates to your jobs with unprecedented accuracy",
  },
  {
    icon: Target,
    title: "Precision Recruiting",
    description:
      "Target the right candidates with data-driven insights and recommendations",
  },
  {
    icon: Zap,
    title: "Accelerated Hiring",
    description:
      "Reduce time-to-hire by 60% with automated screening and scheduling",
  },
  {
    icon: Users,
    title: "Talent Pipeline",
    description:
      "Build and nurture a pool of qualified candidates for future positions",
  },
];

export function TalentFeatures() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <Card key={feature.title} className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="relative z-10">
                <Icon className="h-10 w-10 mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
