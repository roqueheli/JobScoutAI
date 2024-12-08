"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mic, Video } from "lucide-react";
import { useState } from "react";

export default function ConductInterview() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);

  const questions = [
    "Tell me about your experience with React and Next.js.",
    "How do you handle challenging situations in a team environment?",
    "Describe a complex technical problem you solved recently.",
    "What are your thoughts on AI in the workplace?",
  ];

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              AI Interview Session
            </h1>
            <p className="text-muted-foreground">
              Frontend Developer Position - Technical & Behavioral Assessment
            </p>
          </div>

          <Progress value={(currentQuestion / questions.length) * 100} />

          <Card>
            <CardHeader>
              <CardTitle>Current Question</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{questions[currentQuestion]}</p>
              <div className="space-y-4">
                <Textarea
                  placeholder="Type your response here..."
                  className="min-h-[150px]"
                />
                <div className="flex gap-4">
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Recording...
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-4 w-4" />
                        Record Answer
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Enable Video
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              Previous Question
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestion === questions.length - 1}
            >
              Next Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
