"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="flex justify-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BriefcaseIcon className="h-6 w-6" />
          <span>JobScoutAI</span>
        </Link>
        
        <nav className="flex items-center gap-6 mx-6">
          <Link href="/jobs" className="text-sm font-medium hover:text-primary">
            Browse Jobs
          </Link>
          <Link href="/companies" className="text-sm font-medium hover:text-primary">
            Companies
          </Link>
        </nav>
        
        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/post-job">Post a Job</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}