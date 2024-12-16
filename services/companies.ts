export async function getCompanies(filters: {
    search: string;
    industry: string[];
    size: string[];
    location: string[];
}) {
    const params = new URLSearchParams();

    if (filters.search) {
        params.append('search', filters.search);
    }

    filters.industry.forEach(i => params.append('industry', i));
    filters.size.forEach(s => params.append('size', s));
    filters.location.forEach(l => params.append('location', l));

    const response = await fetch(`/api/companies?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch companies');
    }
    return response.json();
}

export async function getCompanyById(id: string) {
    const response = await fetch(`/api/companies/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch company details');
    }
    return response.json();
}