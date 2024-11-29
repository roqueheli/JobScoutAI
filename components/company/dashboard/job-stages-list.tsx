import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { differenceInDays } from "date-fns";

const JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    totalCandidates: 45,
    stages: [
      {
        name: "Applied",
        count: 45,
        deadline: "2024-03-20",
      },
      {
        name: "Screening",
        count: 26,
        deadline: "2024-03-25",
      },
      {
        name: "Interview",
        count: 12,
        deadline: "2024-04-05",
      },
      {
        name: "Offer",
        count: 3,
        deadline: "2024-04-15",
      },
      {
        name: "Scheduled",
        count: 2,
        deadline: "2024-12-31",
      },
    ],
  },
  {
    id: 2,
    title: "Product Designer",
    totalCandidates: 32,
    stages: [
      {
        name: "Applied",
        count: 28,
        deadline: "2024-03-18",
      },
      {
        name: "Screening",
        count: 20,
        deadline: "2024-03-22",
      },
      {
        name: "Interview",
        count: 8,
        deadline: "2024-04-01",
      },
      {
        name: "Scheduled",
        count: 4,
        deadline: "2024-12-31",
      },
    ],
  },
] as const;

export function JobStagesList() {
  const getDaysUntilDeadline = (deadline: string) => {
    const daysLeft = differenceInDays(new Date(deadline), new Date());
    return daysLeft;
  };

  const getDeadlineColor = (daysLeft: number) => {
    if (daysLeft <= 2) return "text-red-500";
    if (daysLeft <= 5) return "text-yellow-500";
    return "text-muted-foreground";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Stages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {JOBS.map((job) => (
          <div key={job.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{job.title}</h3>
              <Badge variant="secondary">
                {job.totalCandidates} candidates
              </Badge>
            </div>
            <div className="space-y-2">
              {job.stages.map((stage) => {
                const progress = (stage.count / job.totalCandidates) * 100;
                const daysLeft = getDaysUntilDeadline(stage.deadline);
                const deadlineColor = getDeadlineColor(daysLeft);

                return (
                  <div key={stage.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{stage.name}</span>
                      <span className={deadlineColor}>
                        {daysLeft} days left
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={progress} className="h-2" />
                      <span className="text-sm text-muted-foreground w-12">
                        {stage.count}/{job.totalCandidates}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
