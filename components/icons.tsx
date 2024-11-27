import {
  Briefcase,
  Loader2,
  type LucideIcon,
  type LucideProps,
  Github,
  MapPin,
  Building,
  Clock,
  Search,
  Users,
  Globe,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  briefcase: Briefcase,
  spinner: Loader2,
  gitHub: Github,
  google: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  ),
  mapPin: MapPin,
  building: Building,
  clock: Clock,
  search: Search,
  users: Users,
  globe: Globe,
} as const;
