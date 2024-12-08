"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface Question {
  id: number;
  text: string;
  type: "technical" | "behavioral";
  category: string;
}

export default function InterviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState("");

  // Mock questions - these would come from your API
  const questions: Question[] = [
    {
      id: 1,
      text: "Can you describe a challenging project you worked on and how you handled it?",
      type: "behavioral",
      category: "Problem Solving",
    },
    {
      id: 2,
      text: "Explain the concept of state management in React.",
      type: "technical",
      category: "Technical Skills",
    },
    // Add more questions
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = async () => {
    setIsProcessing(true);

    try {
      // Here you would send the answer to your AI analysis endpoint
      const response = await fetch("/api/interview/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questions[currentQuestion],
          answer: currentAnswer,
        }),
      });

      const analysis = await response.json();

      setAnswers([...answers, currentAnswer]);
      setCurrentAnswer("");

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Interview complete - redirect to results
        // router.push("/interview/results");
      }
    } catch (error) {
      console.error("Error analyzing answer:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">AI Interview</h1>
        <Progress value={progress} className="h-2" />
        <p className="text-muted-foreground mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/ai-interviewer.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <span>AI Interviewer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{questions[currentQuestion].text}</p>
            <div className="mt-2">
              <Badge variant="outline">{questions[currentQuestion].type}</Badge>
              <Badge variant="outline" className="ml-2">
                {questions[currentQuestion].category}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Type your answer here..."
              className="min-h-[200px]"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleNext}
                disabled={!currentAnswer.trim() || isProcessing}
              >
                {isProcessing ? "Analyzing..." : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
