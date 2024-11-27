"use client";
import { CompanyJobs } from "@/components/companies/company-jobs";
import { CompanyOverview } from "@/components/companies/company-overview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Globe, MapPin, Users } from "lucide-react";

export default function CompanyProfileDetail({ company }: { company: any }) {
  return (
    <div className="container py-8">
      <div className="max-w-5xl mx-auto">
        {/* Company Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback>{company.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{company.name}</h1>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {company.industry}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {company.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {company.size} employees
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Website
                          </a>
                        </span>
                      </div>
                    </div>
                    <Button>View Open Positions</Button>
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
            <CompanyOverview company={company} />
          </TabsContent>

          <TabsContent value="jobs">
            <CompanyJobs companyId={company.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}