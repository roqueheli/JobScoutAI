"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$199",
    description: "Perfect for small businesses starting their hiring journey",
    features: [
      "Up to 3 active job postings",
      "Basic candidate matching",
      "Standard job distribution",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "$499",
    description: "Ideal for growing companies with regular hiring needs",
    features: [
      "Up to 10 active job postings",
      "Advanced AI matching",
      "Premium job distribution",
      "Priority support",
      "Candidate tracking system",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations",
    features: [
      "Unlimited job postings",
      "Custom AI matching algorithms",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "Advanced analytics",
    ],
  },
];

export function PricingPlans() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={plan.popular ? "border-primary shadow-lg" : ""}
        >
          <CardHeader>
            {plan.popular && (
              <div className="text-sm font-medium text-primary mb-2">
                Most Popular
              </div>
            )}
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">{plan.price}</div>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={plan.popular ? "default" : "outline"}
            >
              Get Started
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
