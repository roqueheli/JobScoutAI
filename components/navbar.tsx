"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CompanyAdminMenu } from "./company/admin/company-admin-menu";
import { UserMenu } from "./user/user-menu";

export function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  
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
          {isAuthenticated && user ? (
            <>
              {user.role === "ADMIN" ? (
                <>
                  <CompanyAdminMenu
                    user={{
                      name: `${user.first_name} ${user.last_name}`, // Actualizado
                      email: user.email,
                      image: user.profilePicture,
                      role: user.role,
                      company: {
                        name: "Company Name",
                        logo: "Company Logo URL",
                      },
                      notifications: 0,
                    }}
                    onLogout={logout}
                  />
                  <Button asChild>
                    <Link href="/company/post-job">Post a Job</Link>
                  </Button>
                </>
              ) : (
                <UserMenu
                  user={{
                    name: `${user.first_name} ${user.last_name}`, // Actualizado
                    email: user.email,
                    image: user.profilePicture,
                  }}
                  onLogout={logout}
                />
              )}
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
