"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground">
                  Welcome to JobScoutAI. By accessing and using our platform,
                  you agree to be bound by these Terms and Conditions. Please
                  read them carefully before using our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  2. Services Description
                </h2>
                <p className="text-muted-foreground">
                  JobScoutAI provides AI-powered job search and career
                  development services. Our platform helps connect job seekers
                  with potential employers and offers career guidance through
                  artificial intelligence.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  3. User Obligations
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Provide accurate and truthful information</li>
                  <li>Maintain the confidentiality of your account</li>
                  <li>Use the platform in compliance with applicable laws</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  4. Intellectual Property
                </h2>
                <p className="text-muted-foreground">
                  All content, features, and functionality of JobScoutAI are
                  owned by us and protected by international copyright,
                  trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  5. Limitation of Liability
                </h2>
                <p className="text-muted-foreground">
                  JobScoutAI shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages resulting from
                  your use or inability to use the service.
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
