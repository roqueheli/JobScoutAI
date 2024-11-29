"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Check, Minus } from "lucide-react";

const features = [
  {
    category: "Job Postings",
    features: [
      {
        name: "Active job listings",
        starter: "3",
        professional: "10",
        enterprise: "Unlimited",
      },
      {
        name: "Featured job posts",
        starter: false,
        professional: "2/month",
        enterprise: "Unlimited",
      },
      {
        name: "Job boost promotion",
        starter: false,
        professional: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Candidate Matching",
    features: [
      {
        name: "AI-powered matching",
        starter: "Basic",
        professional: "Advanced",
        enterprise: "Custom",
      },
      {
        name: "Candidate recommendations",
        starter: "10/month",
        professional: "50/month",
        enterprise: "Unlimited",
      },
      {
        name: "Talent pool access",
        starter: false,
        professional: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Support & Training",
    features: [
      {
        name: "Customer support",
        starter: "Email",
        professional: "Priority",
        enterprise: "24/7 Dedicated",
      },
      {
        name: "Training sessions",
        starter: false,
        professional: "2/month",
        enterprise: "Unlimited",
      },
      {
        name: "Account manager",
        starter: false,
        professional: false,
        enterprise: true,
      },
    ],
  },
];

export function PricingComparison() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Compare Plans
        </h2>
        <p className="text-muted-foreground">
          Detailed comparison of all features across plans
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Features</TableHead>
              <TableHead>Starter</TableHead>
              <TableHead>Professional</TableHead>
              <TableHead>Enterprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((category) => (
              <>
                <TableRow key={category.category}>
                  <TableCell className="font-medium" colSpan={4}>
                    {category.category}
                  </TableCell>
                </TableRow>
                {category.features.map((feature) => (
                  <TableRow key={feature.name}>
                    <TableCell className="text-muted-foreground">
                      {feature.name}
                    </TableCell>
                    <TableCell>
                      {typeof feature.starter === "boolean" ? (
                        feature.starter ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Minus className="h-4 w-4 text-muted-foreground" />
                        )
                      ) : (
                        feature.starter
                      )}
                    </TableCell>
                    <TableCell>
                      {typeof feature.professional === "boolean" ? (
                        feature.professional ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Minus className="h-4 w-4 text-muted-foreground" />
                        )
                      ) : (
                        feature.professional
                      )}
                    </TableCell>
                    <TableCell>
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Minus className="h-4 w-4 text-muted-foreground" />
                        )
                      ) : (
                        feature.enterprise
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
