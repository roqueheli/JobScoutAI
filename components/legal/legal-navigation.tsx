"use client";
import { cn } from "@/lib/utils";
import { Accessibility, Cookie, ScrollText, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const legalLinks = [
  {
    href: "/legal/terms",
    label: "Terms & Conditions",
    icon: ScrollText,
  },
  {
    href: "/legal/privacy",
    label: "Privacy Policy",
    icon: Shield,
  },
  {
    href: "/legal/cookies",
    label: "Cookies Policy",
    icon: Cookie,
  },
  {
    href: "/legal/accesibility",
    label: "Accesibility",
    icon: Accessibility,
  },
];

export function LegalNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center space-x-4 py-4 bg-muted">
      {legalLinks.map(({ href, label, icon: Icon }) => (
        <Link
          href={href}
          key={href}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors",
            pathname === href
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary"
          )}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
