import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  BriefcaseIcon,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="flex justify-center w-full border-t bg-background">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid gap-8 py-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/jobscout-logo.png"
                alt="JobScoutAI Logo"
                width={35}
                height={35}
              />
              <span>JobScoutAI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting talent with opportunities. Find your next career move
              with us.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="text-muted-foreground hover:text-primary"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-muted-foreground hover:text-primary"
                >
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/salary-guide"
                  className="text-muted-foreground hover:text-primary"
                >
                  Salary Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/career-advice"
                  className="text-muted-foreground hover:text-primary"
                >
                  Career Advice
                </Link>
              </li>
              <li>
                <Link
                  href="/resume-builder"
                  className="text-muted-foreground hover:text-primary"
                >
                  Resume Builder
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/post-job"
                  className="text-muted-foreground hover:text-primary"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-primary"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/employer-resources"
                  className="text-muted-foreground hover:text-primary"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/talent-solutions"
                  className="text-muted-foreground hover:text-primary"
                >
                  Talent Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Stay Updated</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest job opportunities and
              career insights.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" type="email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/legal/terms" className="hover:text-primary">
              Terms & Conditions
            </Link>
            <Link href="/legal/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/legal/cookies" className="hover:text-primary">
              Cookie Policy
            </Link>
            <Link href="/legal/accessibility" className="hover:text-primary">
              Accessibility
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JobScoutAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
