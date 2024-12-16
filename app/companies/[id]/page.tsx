"use client";

import { Icons } from "@/components/icons";
import { getCompanyById } from "@/services/companies";
import { CompanyDetail } from "@/types/companies";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CompanyProfileDetail from "./page.container";

export default function CompanyPage() {
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const companyId = params.id as string;

  useEffect(() => {
    async function fetchCompany() {
      try {
        setLoading(true);
        const data = await getCompanyById(companyId);
        setCompany(data);
      } catch (err) {
        setError("Failed to load company details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (companyId) {
      fetchCompany();
    }
  }, [companyId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="container py-8">
        <div className="max-w-5xl mx-auto text-center text-red-500">
          {error || "Company not found"}
        </div>
      </div>
    );
  }

  return <CompanyProfileDetail company={company} />;
}
