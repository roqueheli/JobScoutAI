"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "JobScoutAI transformed our hiring process. The AI matching technology helped us find perfect candidates faster than ever.",
    author: {
      name: "Sarah Chen",
      role: "Head of Talent Acquisition",
      company: "TechCorp Inc.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
  },
  {
    quote:
      "The quality of candidates we receive through JobScoutAI is consistently high. It's streamlined our entire recruitment process.",
    author: {
      name: "Michael Rodriguez",
      role: "HR Director",
      company: "Global Solutions Ltd.",
      avatar: "https://i.pravatar.cc/150?u=michael",
    },
  },
  {
    quote:
      "Their talent solutions have significantly reduced our time-to-hire while improving the quality of our hires.",
    author: {
      name: "Emma Thompson",
      role: "Recruitment Manager",
      company: "Innovation Labs",
      avatar: "https://i.pravatar.cc/150?u=emma",
    },
  },
];

export function TalentTestimonials() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          What Our Clients Say
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Success stories from companies that transformed their hiring with
          JobScoutAI
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="relative">
            <CardHeader>
              <Quote className="h-8 w-8 text-primary opacity-50" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{testimonial.quote}</p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                  />
                  <AvatarFallback>
                    {testimonial.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.author.role}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.author.company}
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
