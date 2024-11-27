"use client";
import { Icons } from "@/components/icons";
import { ApplyJobDialog } from "@/components/jobs/apply-job-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const JobDetailClient = ({ job }: { job: any }) => {
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  
  const {
    title,
    company,
    location,
    type,
    experience,
    salary,
    description,
    requirements,
    benefits,
    skills,
    remote,
    applicants,
    posted,
  } = job;

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6">
          {/* Header Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={company.logo} alt={company.name} />
                      <AvatarFallback>{company.name}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-2xl font-bold">{title}</h1>
                      <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                        <Icons.building className="h-4 w-4" />
                        <span>{company.name}</span>
                        <span>•</span>
                        <Icons.mapPin className="h-4 w-4" />
                        <span>{location}</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => setIsApplyDialogOpen(true)}>
                    Apply Now
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {remote && <Badge>Remote</Badge>}
                  <Badge variant="secondary">{type}</Badge>
                  <Badge variant="secondary">{experience}</Badge>
                  <Badge variant="secondary">{salary}</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icons.clock className="h-4 w-4" />
                    Posted {posted}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icons.users className="h-4 w-4" />
                    {applicants} applicants
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <Tabs defaultValue="description">
                    <TabsList>
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="requirements">
                        Requirements
                      </TabsTrigger>
                      <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-4 space-y-4">
                      <div className="prose dark:prose-invert">
                        <p className="whitespace-pre-line">{description}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill: string) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="requirements" className="mt-4">
                      <p className="whitespace-pre-line">{requirements}</p>
                    </TabsContent>
                    <TabsContent value="benefits" className="mt-4">
                      <p className="whitespace-pre-line">{benefits}</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Company Sidebar */}
            <Card className="h-fit">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h2 className="font-semibold">About the company</h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icons.users className="h-4 w-4 text-muted-foreground" />
                      <span>{company.employees} employees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{company.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Company website
                      </a>
                    </div>
                  </div>
                  <Separator />
                  <p className="text-sm text-muted-foreground">
                    {company.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ApplyJobDialog
        open={isApplyDialogOpen}
        onOpenChange={setIsApplyDialogOpen}
        jobTitle={title}
        companyName={company.name}
      />
    </div>
  );
};

export default JobDetailClient;
