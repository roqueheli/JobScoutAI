import { HeroSection } from "@/components/hero-section";
import { FeaturedJobs } from "@/components/featured-jobs";
import { JobCategories } from "@/components/job-categories";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-16 pb-16">
      <HeroSection />
      <JobCategories />
      <FeaturedJobs />
    </div>
  );
}