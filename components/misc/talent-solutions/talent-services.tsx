"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileCheck, Headphones, Search, Users } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Executive Search",
    description: "Specialized recruitment for senior and executive positions",
    features: [
      "Dedicated headhunting team",
      "Industry-specific expertise",
      "Confidential search process",
    ],
  },
  {
    icon: Users,
    title: "Volume Hiring",
    description: "Efficient solutions for high-volume recruitment needs",
    features: [
      "Scalable hiring process",
      "Bulk candidate screening",
      "Automated assessments",
    ],
  },
  {
    icon: FileCheck,
    title: "Technical Assessment",
    description: "Comprehensive skill evaluation and testing",
    features: [
      "Custom skill assessments",
      "Technical interviews",
      "Coding challenges",
    ],
  },
  {
    icon: Headphones,
    title: "Recruitment Process Outsourcing",
    description: "End-to-end recruitment management",
    features: [
      "Dedicated recruitment team",
      "Custom hiring workflows",
      "Employer branding",
    ],
  },
];

export function TalentServices() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Our Services</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive recruitment solutions tailored to your needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.title}>
              <CardHeader>
                <Icon className="h-8 w-8 mb-4 text-primary" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
