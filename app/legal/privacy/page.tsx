"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-muted-foreground">
                  We collect information that you provide directly to us,
                  including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-muted-foreground">
                  <li>Personal identification information</li>
                  <li>Professional experience and qualifications</li>
                  <li>Job preferences and career goals</li>
                  <li>Usage data and interaction with our platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-muted-foreground">
                  We use the collected information to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-muted-foreground">
                  <li>Provide and improve our services</li>
                  <li>Match you with potential job opportunities</li>
                  <li>Personalize your experience</li>
                  <li>Communicate with you about our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  3. Data Protection
                </h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures
                  to ensure the security of your personal data. Your information
                  is protected against unauthorized access, alteration,
                  disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
                <p className="text-muted-foreground">
                  You have the right to access, correct, or delete your personal
                  data. You can also request data portability or restrict the
                  processing of your information.
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
