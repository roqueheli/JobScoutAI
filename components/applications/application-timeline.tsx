import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface ApplicationTimelineProps {
  timeline: TimelineEvent[];
}

export function ApplicationTimeline({ timeline }: ApplicationTimelineProps) {
  return (
    <div className="space-y-4">
      {timeline.map((event, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            {index < timeline.length - 1 && (
              <div className="h-full w-px bg-border" />
            )}
          </div>
          <Card className="flex-1">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{event.title}</h4>
                  <time className="text-sm text-muted-foreground">
                    {event.date}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
