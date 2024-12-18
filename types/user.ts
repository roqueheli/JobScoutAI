import { UserRole } from "./auth";

// types/user.ts
export interface UserProfile {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    phone: string | null;
    profile_picture: string | null;
    profession: string | null;
    location: string | null;
    bio: string | null;
    experience_years: string | null;
    education: string | null;
    languages: string[];
    resume_url: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    website: string | null;
    skills: string[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export type UpdateProfileData = Partial<Omit<UserProfile, 'id' | 'email' | 'role' | 'created_at' | 'updated_at'>>;
