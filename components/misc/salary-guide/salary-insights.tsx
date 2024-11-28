"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Building2, Globe2, TrendingUp } from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    title: "Market Trends",
    description:
      "Tech salaries have increased by 15% on average in the past year",
  },
  {
    icon: Award,
    title: "Top Skills",
    description:
      "AI/ML and cloud computing skills command the highest premiums",
  },
  {
    icon: Building2,
    title: "Company Size",
    description: "Enterprise companies offer 20% higher salaries than startups",
  },
  {
    icon: Globe2,
    title: "Remote Work",
    description: "Remote positions offer competitive salaries across locations",
  },
];

export function SalaryInsights() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {insights.map((insight) => {
        const Icon = insight.icon;
        return (
          <Card key={insight.title}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Icon className="mr-2 h-4 w-4" />
              <CardTitle className="text-sm font-medium">
                {insight.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {insight.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
