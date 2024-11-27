import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";

export const FEATURED_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: {
      name: "TechCorp",
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=100&auto=format&fit=crop",
      description: "Leading technology company focused on innovation",
      employees: "1000+",
      industry: "Technology",
      website: "https://techcorp.com",
    },
    location: "Remote",
    type: "Full-time",
    experience: "Senior Level",
    salary: "$120k - $150k",
    posted: "2 days ago",
    description: `We are looking for a Senior Frontend Developer to join our team and help build the future of our product. You will be responsible for:
    • Leading frontend development initiatives and mentoring junior developers
    • Architecting and implementing new features using React and TypeScript
    • Collaborating with designers to ensure pixel-perfect implementation
    • Optimizing application performance and improving user experience
    • Contributing to our component library and design system`,
    requirements: `• 5+ years of experience with modern JavaScript and React
    • Strong understanding of TypeScript and state management
    • Experience with Next.js and server-side rendering
    • Knowledge of modern frontend build tools and CI/CD practices
    • Excellent problem-solving and communication skills
    • Experience with testing frameworks and methodologies`,
    benefits: `• Competitive salary and equity package
    • Remote-first work environment
    • Flexible working hours
    • Health, dental, and vision insurance
    • 401(k) matching
    • Learning and development budget
    • Home office setup allowance
    • Regular team retreats`,
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "Testing"],
    remote: true,
    applicants: 45,
  },
  {
    id: 2,
    title: "Product Designer",
    company: {
      name: "DesignStudio",
      logo: "https://images.unsplash.com/photo-1607748885720-1a3ffb908d4e?q=80&w=100&auto=format&fit=crop",
      description: "Creative design studio focused on user-centered design",
      employees: "150+",
      industry: "Design",
      website: "https://designstudio.com",
    },
    location: "New York, NY",
    type: "Full-time",
    experience: "Mid Level",
    salary: "$90k - $120k",
    posted: "1 week ago",
    description: `We are looking for a talented Product Designer to join our growing team. You will be responsible for designing innovative and intuitive user experiences for our clients' digital products. You will collaborate with cross-functional teams and ensure the highest quality of design work.`,
    requirements: `• Strong portfolio demonstrating design skills and creative thinking
    • Proficiency in design tools like Figma, Sketch, or Adobe XD
    • Experience with user research, wireframing, prototyping, and visual design
    • Knowledge of design systems and UX principles
    • Ability to work independently and manage multiple projects`,
    benefits: `• Competitive salary and equity package
    • Creative and collaborative work environment
    • Flexible working hours
    • Health, dental, and vision insurance
    • Generous PTO
    • Professional development opportunities`,
    skills: ["Figma", "UI/UX", "Design Systems"],
    remote: false,
    applicants: 30,
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: {
      name: "CloudScale",
      logo: "https://images.unsplash.com/photo-1573495748341-9c1f8e2b87ba?q=80&w=100&auto=format&fit=crop",
      description: "Cloud infrastructure company helping businesses scale seamlessly",
      employees: "500+",
      industry: "Cloud Computing",
      website: "https://cloudscale.com",
    },
    location: "Remote",
    type: "Full-time",
    experience: "Senior Level",
    salary: "$130k - $160k",
    posted: "3 days ago",
    description: `We are seeking an experienced Backend Engineer to join our growing team. You will be responsible for designing and building scalable, high-performance backend systems to support our cloud-based services. You will collaborate closely with frontend developers, data scientists, and operations teams to deliver robust solutions.`,
    requirements: `• 5+ years of experience in backend development
    • Proficiency with Java and Spring Boot
    • Experience with cloud platforms such as AWS
    • Knowledge of microservices architecture and APIs
    • Familiarity with CI/CD practices and DevOps
    • Strong problem-solving and debugging skills`,
    benefits: `• Competitive salary and equity package
    • Fully remote work option
    • Health, dental, and vision insurance
    • 401(k) matching
    • Learning and development budget
    • Team-building activities`,
    skills: ["Java", "Spring Boot", "AWS"],
    remote: true,
    applicants: 50,
  },
] as const;

export function FeaturedJobs() {
  return (
    <section className="container">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Jobs</h2>
          <p className="text-muted-foreground">
            Explore our hand-picked opportunities
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/jobs">View all jobs</Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED_JOBS.map((job) => (
          <Card key={job.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-1">{job.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BriefcaseIcon className="h-4 w-4" />
                  {job.company.name}
                </span>
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  {job.location}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">{job.type}</Badge>
                <span className="text-muted-foreground">{job.salary}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button className="mt-auto" variant="outline" asChild>
                <Link href={`/jobs/${job.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}