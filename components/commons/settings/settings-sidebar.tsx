"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavigationItem {
  title: string;
  icon: LucideIcon;
  href: string;
  adminOnly?: boolean;
}

interface SettingsSidebarProps {
  navigation: NavigationItem[];
}

export const SettingsSidebar: FC<SettingsSidebarProps> = ({ navigation }) => {
  const pathname = usePathname();
  const isAdmin = true; // Replace with actual auth logic
  const isUser = true; // Replace with actual auth logic

  return (
    <nav className="space-y-2 w-full md:w-64">
      {navigation.map((item) => {
        if (item.adminOnly && !isAdmin) return null;
        if (item.adminOnly === false && isUser) return null;

        return (
          <Link key={item.href} href={item.href} className="block">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                pathname === item.href && "bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};
