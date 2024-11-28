"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Accessibility() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Accessibility Statement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
                <p className="text-muted-foreground">
                  JobScoutAI is committed to ensuring digital accessibility for
                  people with disabilities. We are continually improving the
                  user experience for everyone and applying the relevant
                  accessibility standards.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Accessibility Features
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Screen reader compatibility</li>
                  <li>Keyboard navigation support</li>
                  <li>Text resizing without loss of functionality</li>
                  <li>Color contrast compliance</li>
                  <li>Clear and consistent navigation</li>
                  <li>Alternative text for images</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Standards</h2>
                <p className="text-muted-foreground">
                  We aim to meet WCAG 2.1 Level AA standards. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-muted-foreground">
                  <li>Sufficient color contrast</li>
                  <li>Consistent navigation</li>
                  <li>Alternative text for non-text content</li>
                  <li>Resizable text</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
                <p className="text-muted-foreground">
                  We welcome your feedback on the accessibility of JobScoutAI.
                  Please let us know if you encounter accessibility barriers on
                  our website, and we will work to address them.
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
