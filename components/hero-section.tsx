import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative">
      <div className="container flex flex-col items-center gap-4 text-center pt-16 md:pt-24">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Find Your Dream Job
          <span className="text-primary block">Today</span>
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Discover thousands of job opportunities with all the information you need. Manage all your job applications from start to finish.
        </p>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search jobs..." />
          <Button type="submit">
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Button variant="outline">Remote Jobs</Button>
          <Button variant="outline">Tech Jobs</Button>
          <Button variant="outline">Marketing</Button>
          <Button variant="outline">Design</Button>
        </div>
      </div>
    </div>
  );
}