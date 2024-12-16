import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Globe, MapPin } from "lucide-react";

// Actualizar la interfaz para que coincida con los datos de la base de datos
interface CompanyOverviewProps {
  company: {
    id: string;
    name: string;
    description: string;
    website: string;
    services: string[];
    industry: string[];
    company_size: string;
    founded_year: number;
    location: string;
    is_verified: boolean;
  };
}

export function CompanyOverview({ company }: CompanyOverviewProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="space-y-6 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{company.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industry</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="flex flex-wrap gap-2">
              {company.industry.map((ind) => (
                <Badge key={ind} variant="secondary">
                  {ind}
                </Badge>
              ))}
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {company.services.map((service) => (
                <Badge key={service} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Founded:</span>
                <span>{company.founded_year}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Location:</span>
                <span>{company.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-4 w-4 flex items-center justify-center text-muted-foreground">
                  👥
                </span>
                <span className="text-muted-foreground">Size:</span>
                <span>{company.company_size}</span>
              </li>
              {company.is_verified && (
                <li className="flex items-center gap-2">
                  <span className="h-4 w-4 flex items-center justify-center text-muted-foreground">
                    ✓
                  </span>
                  <span className="text-muted-foreground">
                    Verified Company
                  </span>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connect</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              asChild
            >
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-4 w-4" />
                Visit Website
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
