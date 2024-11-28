import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle2, Clock, Users } from "lucide-react";

const STATS = [
  {
    title: "Active Jobs",
    value: "12",
    change: "+2",
    changeLabel: "from last month",
    icon: Briefcase,
  },
  {
    title: "Total Applicants",
    value: "845",
    change: "+125",
    changeLabel: "from last month",
    icon: Users,
  },
  {
    title: "Avg. Time to Fill",
    value: "28d",
    change: "-3d",
    changeLabel: "from last month",
    icon: Clock,
  },
  {
    title: "Positions Filled",
    value: "32",
    change: "+8",
    changeLabel: "from last month",
    icon: CheckCircle2,
  },
] as const;

export function JobListingStats() {
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
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  stat.change.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {stat.change}
              </span>{" "}
              {stat.changeLabel}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
