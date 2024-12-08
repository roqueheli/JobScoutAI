"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function InterviewResults() {
  // This would come from your API/state management
  const results = {
    overallScore: 85,
    technicalScore: 82,
    behavioralScore: 88,
    feedback: {
      strengths: [
        "Strong problem-solving approach",
        "Clear communication style",
        "Good technical knowledge",
      ],
      improvements: [
        "Could provide more specific examples",
        "Expand on technical implementations",
      ],
    },
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Interview Results
        </h1>
        <p className="text-muted-foreground">
          Here's how you performed in your AI interview
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">
              {results.overallScore}%
            </div>
            <Progress value={results.overallScore} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                {results.technicalScore}%
              </div>
              <Progress value={results.technicalScore} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Behavioral Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                {results.behavioralScore}%
              </div>
              <Progress value={results.behavioralScore} className="h-2" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Strengths</h3>
                <ul className="list-disc pl-6 space-y-1">
                  {results.feedback.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Areas for Improvement</h3>
                <ul className="list-disc pl-6 space-y-1">
                  {results.feedback.improvements.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/interview">Retake Interview</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
