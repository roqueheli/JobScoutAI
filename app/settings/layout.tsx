"use client";

import { SettingsHeader } from "@/components/commons/settings/settings-header";
import { SettingsSidebar } from "@/components/commons/settings/settings-sidebar";
import { Bell, Building2, Palette, Settings, Shield, User } from "lucide-react";

const settingsNavigation = [
  // {
  //   title: "General",
  //   icon: Settings,
  //   href: "/settings",
  // },
  {
    title: "Profile",
    icon: User,
    href: "/settings/user",
    adminOnly: false,
  },
  {
    title: "Company",
    icon: Building2,
    href: "/settings/company",
    adminOnly: true,
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/settings/notifications",
  },
  {
    title: "Security",
    icon: Shield,
    href: "/settings/security",
  },
  // {
  //   title: "Appearance",
  //   icon: Palette,
  //   href: "/settings/appearance",
  // },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <SettingsHeader
        title="Settings"
        description="Manage your account settings and preferences."
      />
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <SettingsSidebar navigation={settingsNavigation} />
        <div className="flex-1 min-h-[600px]">
          <div className="bg-card rounded-lg border p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
