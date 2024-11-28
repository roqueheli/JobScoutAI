"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationList } from "@/components/applications/application-list";
import { ApplicationFilters } from "@/components/applications/application-filters";
import { ApplicationStats } from "@/components/applications/application-stats";

export default function ApplicationsPage() {
  const [filters, setFilters] = useState({
    status: [],
    date: "all",
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>

        <ApplicationStats />

        <div className="flex items-center justify-between">
          <ApplicationFilters filters={filters} setFilters={setFilters} />
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ApplicationList filters={filters} />
          </TabsContent>
          <TabsContent value="active">
            <ApplicationList filters={{ ...filters, archived: false }} />
          </TabsContent>
          <TabsContent value="archived">
            <ApplicationList filters={{ ...filters, archived: true }} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
