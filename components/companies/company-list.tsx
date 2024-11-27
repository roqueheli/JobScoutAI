"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BriefcaseIcon, MapPinIcon, Users } from "lucide-react";
import Link from "next/link";

// This would typically come from your API
export const COMPANIES = [
  {
    id: 1,
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=100&auto=format&fit=crop",
    description:
      "Leading technology company focused on building innovative solutions for enterprise clients.",
    industry: "tech",
    size: "1000+",
    location: "us",
    openPositions: 25,
    benefits: ["Remote Work", "Health Insurance", "401k", "Learning Budget"],
    tags: ["AI/ML", "Cloud", "Enterprise"],
  },
  {
    id: 2,
    name: "DesignStudio",
    logo: "https://images.unsplash.com/photo-1680795456548-92f85b44f7c7?q=80&w=100&auto=format&fit=crop",
    description:
      "Creative design agency working with startups and established brands worldwide.",
    industry: "tech",
    size: "11-50",
    location: "remote",
    openPositions: 8,
    benefits: ["Flexible Hours", "Creative Environment", "Stock Options"],
    tags: ["Design", "Branding", "UX/UI"],
  },
  {
    id: 3,
    name: "FinanceFlow",
    logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=100&auto=format&fit=crop",
    description:
      "Modern fintech company revolutionizing personal and business banking.",
    industry: "finance",
    size: "201-500",
    location: "uk",
    openPositions: 15,
    benefits: ["Competitive Salary", "Annual Bonus", "Health & Wellness"],
    tags: ["Fintech", "Banking", "Innovation"],
  },
  {
    id: 4,
    name: "HealthTech",
    logo: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=100&auto=format&fit=crop",
    description:
      "Healthcare technology company improving patient care through innovation.",
    industry: "healthcare",
    size: "51-200",
    location: "us",
    openPositions: 12,
    benefits: [
      "Medical Coverage",
      "Work-Life Balance",
      "Professional Development",
    ],
    tags: ["Healthcare", "Technology", "Impact"],
  },
  {
    id: 5,
    name: "EduTech",
    logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=100&auto=format&fit=crop",
    description:
      "Educational technology platform making learning accessible to everyone.",
    industry: "education",
    size: "51-200",
    location: "remote",
    openPositions: 10,
    benefits: ["Remote First", "Learning Stipend", "Flexible Time Off"],
    tags: ["EdTech", "E-learning", "Remote"],
  },
] as const;

interface CompanyListProps {
  filters: {
    industry: string[];
    size: string[];
    location: string[];
  };
  search: string;
}

export function CompanyList({ filters, search }: CompanyListProps) {
  const filteredCompanies = COMPANIES.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesIndustry =
      filters.industry.length === 0 ||
      filters.industry.includes(company.industry);
    const matchesSize =
      filters.size.length === 0 || filters.size.includes(company.size);
    const matchesLocation =
      filters.location.length === 0 ||
      filters.location.includes(company.location);

    return matchesSearch && matchesIndustry && matchesSize && matchesLocation;
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {filteredCompanies.map((company) => (
        <Card key={company.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={company.logo} alt={company.name} />
                <AvatarFallback>{company.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold">{company.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPinIcon className="h-4 w-4" />
                    {company.location === "remote"
                      ? "Remote"
                      : company.location.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {company.size}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <BriefcaseIcon className="h-4 w-4" />
                    {company.openPositions} open positions
                  </span>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/companies/${company.id}`}>View Profile</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {company.description}
            </p>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {company.benefits.map((benefit) => (
                  <Badge key={benefit} variant="secondary">
                    {benefit}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {company.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredCompanies.length === 0 && (
        <div className="col-span-full text-center py-12">
          <h3 className="text-lg font-medium">No companies found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search term
          </p>
        </div>
      )}
    </div>
  );
}
