import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";
        const industry = searchParams.getAll("industry");
        const size = searchParams.getAll("size");
        const location = searchParams.getAll("location");

        const response = await fetch(`${process.env.API_URL}/companies`);
        const companies = await response.json();

        // Filtrar las empresas según los parámetros
        const filteredCompanies = companies.filter((company: any) => {
            const matchesSearch = company.name
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesIndustry =
                industry.length === 0 ||
                company.industry.some((i: string) =>
                    industry.includes(i.toLowerCase().replace(/\s+/g, '')));
            const matchesSize =
                size.length === 0 ||
                size.includes(company.company_size.toLowerCase().replace(/\s+/g, ''));
            const matchesLocation =
                location.length === 0 ||
                location.some(l => company.location.toLowerCase().includes(l));

            return matchesSearch && matchesIndustry && matchesSize && matchesLocation;
        });

        // Transformar los datos para que coincidan con el formato esperado por el frontend
        const transformedCompanies = filteredCompanies.map((company: any) => ({
            id: company.id,
            name: company.name,
            logo: company.logo_url,
            description: company.description,
            industry: company.industry[0].toLowerCase().replace(/\s+/g, ''),
            size: company.company_size.replace(/\s+/g, ''),
            location: company.location.toLowerCase().includes('remote') ? 'remote' :
                company.location.split(',')[1].trim().toLowerCase(),
            openPositions: company.job_posts.length,
            benefits: company.services,
            tags: company.industry,
        }));

        return NextResponse.json(transformedCompanies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }
}