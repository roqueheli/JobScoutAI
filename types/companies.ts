export interface Company {
    id: string;
    name: string;
    description: string;
    logo_url: string;
    website: string;
    services: string[];
    industry: string[];
    company_size: string;
    founded_year: number;
    location: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
    companyAdmins: any[];
    job_posts: any[];
}

export interface CompanyDetail {
    id: string;
    name: string;
    description: string;
    logo_url: string;
    website: string;
    services: string[];
    industry: string[];
    company_size: string;
    founded_year: number;
    location: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
    companyAdmins: any[];
    job_posts: any[];
}
