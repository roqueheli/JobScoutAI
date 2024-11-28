"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const settingsSections = [
    {
      title: "Profile Settings",
      description: "Manage your personal information and preferences",
      href: "/settings/profile",
    },
    {
      title: "Company Settings",
      description: "Configure your company profile and details",
      href: "/settings/company",
    },
    {
      title: "Security",
      description: "Manage your account security and authentication",
      href: "/settings/security",
    },
    {
      title: "Notifications",
      description: "Configure your notification preferences",
      href: "/settings/notifications",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {settingsSections.map((section) => (
        <Card
          key={section.href}
          className="group hover:shadow-lg transition-shadow"
        >
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={section.href}>
              <Button
                variant="ghost"
                className="group-hover:translate-x-1 transition-transform"
              >
                Configure <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
