"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCompanies } from "@/services/companies";
import {
  BriefcaseIcon,
  ChevronLeft,
  ChevronRight,
  MapPinIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icons } from "../icons";

interface CompanyListProps {
  filters: {
    industry: string[];
    services: string[];
    size: string[];
    location: string[];
  };
  search: string;
}

const ITEMS_PER_PAGE = 6;

export function CompanyList({ filters, search }: CompanyListProps) {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const data = await getCompanies({ search, ...filters });
        setCompanies(data);
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
        setError(null);
      } catch (err) {
        setError("Failed to fetch companies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [filters, search]);

  // Calcular las empresas que se mostrarán en la página actual
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentCompanies = companies.slice(indexOfFirstItem, indexOfLastItem);

  // Funciones para la paginación
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full text-center py-12">
        <h3 className="text-lg font-medium text-red-500">{error}</h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {currentCompanies.map((company) => (
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
                  {company.benefits?.map((benefit) => (
                    <Badge key={benefit} variant="secondary">
                      {benefit}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {company.tags?.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {companies.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium">No companies found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
