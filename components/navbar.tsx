"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CompanyAdminMenu } from "./company/admin/company-admin-menu";
import { UserMenu } from "./user/user-menu";

// This would typically come from your auth context/provider
const MOCK_USER = {
  name: "John Doe",
  email: "john@example.com",
  image:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
  role: "company_admn",
  company: {
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=100&auto=format&fit=crop",
  },
  notifications: 18,
};

export function Navbar() {
  // This would typically be handled by your auth state
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  return (
    <header className="flex justify-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/jobscout-logo.png"
            alt="JobScoutAI Logo"
            width={35}
            height={35}
          />
          <span>JobScoutAI</span>
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
            MOCK_USER.role === "company_admin" ? (
              <>
                <CompanyAdminMenu
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  user={MOCK_USER}
                />
                <Button asChild>
                  {isAuthenticated && MOCK_USER.role === "company_admin" && (
                    <Link href="/company/post-job">Post a Job</Link>
                  )}
                </Button>
              </>
            ) : (
              <UserMenu
                setIsAuthenticated={setIsAuthenticated}
                user={MOCK_USER}
              />
            )
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign in</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
