"use client";

import { PricingPlans } from "@/components/misc/pricing/pricing-plans";
// import { PricingFAQ } from "@/components/misc/pricing/pricing-faq";
// import { PricingComparison } from "@/components/misc/pricing/pricing-comparison";

export default function PricingPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Pricing Plans</h1>
          <p className="text-muted-foreground mt-2">
            Choose the perfect plan for your hiring needs
          </p>
        </div>

        <PricingPlans />
        {/* <PricingComparison />
        <PricingFAQ /> */}
      </div>
    </div>
  );
}