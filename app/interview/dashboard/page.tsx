"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Brain,
    MessageSquare,
    Users
} from "lucide-react";
import Link from "next/link";

const InterviewStats = [
  {
    title: "Total Interviews",
    value: "156",
    icon: MessageSquare,
    description: "Conducted this month",
  },
  {
    title: "Technical Assessments",
    value: "89",
    icon: Brain,
    description: "Code challenges completed",
  },
  {
    title: "Behavioral Interviews",
    value: "67",
    icon: Users,
    description: "Soft skills evaluated",
  },
];

export default function InterviewDashboard() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              AI Interview Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage your automated interview processes
            </p>
          </div>
          <Button asChild>
            <Link href="/interviews/conduct">Start New Interview</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {InterviewStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
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

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">Frontend Developer</div>
                        <span className="text-sm text-muted-foreground">
                          2h ago
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Technical + Behavioral Assessment
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/interviews/results/${i}`}>
                        View Results
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interview Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Technical Skills</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Communication</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Problem Solving</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
