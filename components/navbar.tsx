"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { BriefcaseIcon } from "lucide-react";
import { UserMenu } from "./user/user-menu";

// This would typically come from your auth context/provider
const MOCK_USER = {
  name: "John Doe",
  email: "john@example.com",
  image:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
};

export function Navbar() {
  // This would typically be handled by your auth state
  const isAuthenticated = true;

  return (
    <header className="flex justify-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BriefcaseIcon className="h-6 w-6" />
          <span>JobBoard</span>
        </Link>

        <nav className="flex items-center gap-6 mx-6">
          <Link href="/jobs" className="text-sm font-medium hover:text-primary">
            Browse Jobs
          </Link>
          <Link
            href="/companies"
            className="text-sm font-medium hover:text-primary"
          >
            Companies
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <UserMenu user={MOCK_USER} />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Post a Job</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
