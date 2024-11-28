"use client";

// import { TalentServices } from "@/components/employers/talent-solutions/talent-services";
// import { TalentTestimonials } from "@/components/employers/talent-solutions/talent-testimonials";
import { TalentFeatures } from "@/components/misc/talent-solutions/talent-features";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TalentSolutionsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            AI-Powered Talent Solutions
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Transform your hiring process with our advanced AI technology and
            expert recruitment services
          </p>
          <Button asChild size="lg">
            <Link href="/employers/contact">
              Schedule a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <TalentFeatures />
        {/* <TalentServices />
        <TalentTestimonials /> */}
      </div>
    </div>
  );
}
