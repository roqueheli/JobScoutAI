import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleOff, FileCheck, MessageSquare, Send, Timer } from "lucide-react";

// This would typically come from your API
const STATS = [
  {
    title: "Total Applications",
    value: "24",
    icon: Send,
    description: "Applications submitted",
  },
  {
    title: "In Progress",
    value: "12",
    icon: Timer,
    description: "Currently being reviewed",
  },
  {
    title: "Interviews",
    value: "8",
    icon: MessageSquare,
    description: "Scheduled or completed",
  },
  {
    title: "Rejected",
    value: "4",
    icon: CircleOff,
    description: "Applications not selected",
  },
] as const;

export function ApplicationStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
