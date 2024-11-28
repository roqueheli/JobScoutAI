"use client";

// import { ResourceGuides } from "@/components/employers/resources/resource-guides";
// import { ResourceTools } from "@/components/employers/resources/resource-tools";
// import { ResourceWebinars } from "@/components/employers/resources/resource-webinars";

export default function EmployerResourcesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Employer Resources
          </h1>
          <p className="text-muted-foreground">
            Tools and guides to optimize your hiring process
          </p>
        </div>

        {/* <ResourceGuides />
        <ResourceWebinars />
        <ResourceTools /> */}
      </div>
    </div>
  );
}
