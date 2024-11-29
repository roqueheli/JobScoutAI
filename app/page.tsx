import { HeroSection } from "@/components/hero-section";
import { FeaturedJobs } from "@/components/featured-jobs";
import { JobCategories } from "@/components/job-categories";
import { TalentTestimonials } from "@/components/misc/talent-solutions/talent-testimonials";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-16 pb-16">
      <HeroSection />
      <JobCategories />
      <FeaturedJobs />
      <div className="container">
        <TalentTestimonials />
      </div>
    </div>
  );
}