"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  User,
  Settings,
  Building,
  Users,
  FileText,
  BarChart,
  BriefcaseIcon,
  LogOut,
  Bell,
} from "lucide-react";

interface CompanyAdminMenuProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: {
    name: string;
    email: string;
    image?: string;
    company: {
      name: string;
      logo?: string;
    };
  };
}

export function CompanyAdminMenu({
  isAuthenticated,
  setIsAuthenticated,
  user,
}: CompanyAdminMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.company.logo} alt={user.company.name} />
            <AvatarFallback>{user.company.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.company.name}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/company/dashboard" className="w-full cursor-pointer">
              <BarChart className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/company/jobs" className="w-full cursor-pointer">
              <BriefcaseIcon className="mr-2 h-4 w-4" />
              <span>Job Listings</span>
              <DropdownMenuShortcut>⌘J</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/company/applications"
              className="w-full cursor-pointer"
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Applications</span>
              <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/company/candidates" className="w-full cursor-pointer">
              <Users className="mr-2 h-4 w-4" />
              <span>Candidate Pool</span>
              <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/company/profile" className="w-full cursor-pointer">
              <Building className="mr-2 h-4 w-4" />
              <span>Company Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/company/team" className="w-full cursor-pointer">
              <Users className="mr-2 h-4 w-4" />
              <span>Team Management</span>
              <DropdownMenuShortcut>⇧⌘T</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/company/notifications"
              className="w-full cursor-pointer"
            >
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
              <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/company/settings" className="w-full cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setIsAuthenticated(!isAuthenticated)}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
