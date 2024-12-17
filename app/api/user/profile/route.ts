import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Esquema de validación actualizado
const updateProfileSchema = z.object({
    first_name: z.string().min(1).max(100).optional(),
    last_name: z.string().min(1).max(100).optional(),
    phone: z.string().max(20).nullable().optional(),
    profile_picture: z.string().max(255).nullable().optional(),
    profession: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    experience_years: z.string().nullable().optional(),
    education: z.string().nullable().optional(),
    languages: z.array(z.string()).optional(),
    resume_url: z.string().max(255).nullable().optional(),
    linkedin_url: z.string().max(255).nullable().optional(),
    github_url: z.string().max(255).nullable().optional(),
    website: z.string().max(255).nullable().optional(),
    skills: z.array(z.string()).optional(),
});

// GET /api/user/profile
export async function GET(request: NextRequest) {
    try {
        const session = await auth.getCurrentUser(request);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        const response = await fetch(`${process.env.API_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        const profile = await response.json();
        return NextResponse.json(profile);
    } catch (error) {
        console.error('Profile fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}

// PATCH /api/user/profile
export async function PATCH(request: NextRequest) {
    try {
        const session = await auth.getCurrentUser(request);
        if (!session?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const validatedData = updateProfileSchema.parse(data);

        const response = await fetch(`${process.env.API_URL}/users/profile`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${session.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        const updatedProfile = await response.json();
        return NextResponse.json(updatedProfile);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error('Profile update error:', error);
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}