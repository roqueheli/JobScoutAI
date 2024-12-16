"use client";
import { CompanyFilters } from "@/components/companies/company-filters";
import { CompanyList } from "@/components/companies/company-list";
import { CompanySearch } from "@/components/companies/company-search";
import { useState } from "react";

export default function CompaniesPage() {
  const [filters, setFilters] = useState({
    industry: [],
    services: [],
    size: [],
    location: [],
  });
  const [search, setSearch] = useState("");

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Top Companies</h1>
          <p className="text-muted-foreground">
            Discover great places to work and explore their open positions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <CompanySearch search={search} setSearch={setSearch} />
          <CompanyFilters filters={filters} setFilters={setFilters} />
        </div>

        <CompanyList filters={filters} search={search} />
      </div>
    </div>
  );
}
