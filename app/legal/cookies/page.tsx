"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CookiePolicy() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Cookie Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  1. What Are Cookies
                </h2>
                <p className="text-muted-foreground">
                  Cookies are small text files that are placed on your device
                  when you visit our website. They help us provide you with a
                  better experience and understand how you interact with our
                  platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  2. Types of Cookies We Use
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Essential Cookies</h3>
                    <p className="text-muted-foreground">
                      Required for the website to function properly.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Performance Cookies</h3>
                    <p className="text-muted-foreground">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Functionality Cookies</h3>
                    <p className="text-muted-foreground">
                      Remember your preferences and settings.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Targeting Cookies</h3>
                    <p className="text-muted-foreground">
                      Used to deliver relevant content and advertisements.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  3. Managing Cookies
                </h2>
                <p className="text-muted-foreground">
                  You can control and manage cookies through your browser
                  settings. Please note that removing or blocking cookies may
                  impact your user experience on our website.
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
