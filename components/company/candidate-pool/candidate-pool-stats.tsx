"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Clock, UserCheck, Users } from "lucide-react";

const stats = [
  {
    title: "Total Candidates",
    value: "1,234",
    icon: Users,
    description: "Active in pool",
  },
  {
    title: "Qualified Matches",
    value: "423",
    icon: UserCheck,
    description: "Ready for placement",
  },
  {
    title: "In Process",
    value: "89",
    icon: Clock,
    description: "Currently interviewing",
  },
  {
    title: "Placed",
    value: "156",
    icon: Briefcase,
    description: "Successfully hired",
  },
];

export function CandidatePoolStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
