"use client";
import { CompanyJobs } from "@/components/companies/company-jobs";
import { CompanyOverview } from "@/components/companies/company-overview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyDetail } from "@/types/companies";
import { Building, Globe, MapPin, Users } from "lucide-react";

interface CompanyProfileDetailProps {
  company: CompanyDetail;
}

export default function CompanyProfileDetail({
  company,
}: CompanyProfileDetailProps) {
  // Transformar los datos para que coincidan con la estructura esperada
  const transformedCompany = {
    id: company.id,
    name: company.name,
    logo: company.logo_url,
    industry: company.industry.join(", "),
    location: company.location,
    size: company.company_size,
    website: company.website,
    description: company.description,
    services: company.services,
    foundedYear: company.founded_year,
    openPositions: company.job_posts.length,
  };

  return (
    <div className="container py-8">
      <div className="max-w-5xl mx-auto">
        {/* Company Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={transformedCompany.logo}
                    alt={transformedCompany.name}
                  />
                  <AvatarFallback>{transformedCompany.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">
                        {transformedCompany.name}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {transformedCompany.industry}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {transformedCompany.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {transformedCompany.size}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          <a
                            href={transformedCompany.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Website
                          </a>
                        </span>
                      </div>
                    </div>
                    <Button>
                      View Open Positions ({transformedCompany.openPositions})
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Open Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <CompanyOverview company={transformedCompany} />
          </TabsContent>

          <TabsContent value="jobs">
            <CompanyJobs companyId={transformedCompany.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
