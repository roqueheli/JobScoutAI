import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle2, Clock, Users } from "lucide-react";

const STATS = [
  {
    title: "Total Candidates",
    value: "2,420",
    change: "+180",
    changeLabel: "from last month",
    icon: Users,
  },
  {
    title: "Active Jobs",
    value: "18",
    change: "+3",
    changeLabel: "from last month",
    icon: Briefcase,
  },
  {
    title: "Time to Hire",
    value: "24d",
    change: "-2d",
    changeLabel: "from last month",
    icon: Clock,
  },
  {
    title: "Hired",
    value: "145",
    change: "+22",
    changeLabel: "from last month",
    icon: CheckCircle2,
  },
] as const;

export function DashboardStats() {
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
