"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tips = [
  {
    title: "Use Action Words",
    description:
      "Start bullet points with strong action verbs like 'Developed,' 'Implemented,' 'Led,' etc.",
  },
  {
    title: "Quantify Achievements",
    description:
      "Include specific numbers and metrics to demonstrate your impact (e.g., 'Increased sales by 25%').",
  },
  {
    title: "Tailor Your Resume",
    description:
      "Customize your resume for each job application by matching keywords from the job description.",
  },
  {
    title: "Keep it Concise",
    description:
      "Aim for a maximum of 2 pages, focusing on your most relevant experiences.",
  },
  {
    title: "Proofread Carefully",
    description:
      "Review for spelling, grammar, and formatting consistency. Ask someone else to review it too.",
  },
];

export function ResumeTips() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Writing Tips</CardTitle>
        <CardDescription>
          Expert advice to make your resume stand out
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {tips.map((tip, index) => (
            <AccordionItem key={index} value={`tip-${index}`}>
              <AccordionTrigger>{tip.title}</AccordionTrigger>
              <AccordionContent>{tip.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
