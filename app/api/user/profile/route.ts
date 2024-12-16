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

// GET /api/user/profile o GET /api/user/profile/resume
export async function GET(request: NextRequest) {
    try {
        const session = await auth.getCurrentUser(request);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        const { pathname } = new URL(request.url);

        // Si es una solicitud para descargar el CV
        if (pathname.endsWith('/resume')) {
            const response = await fetch(`${process.env.API_URL}/users/profile/resume`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to download resume');
            }

            // Obtener el blob del CV
            const blob = await response.blob();
            return new NextResponse(blob, {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="resume.pdf"',
                },
            });
        }

        // Si es una solicitud para obtener el perfil
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

// POST /api/user/profile/resume o POST /api/user/profile/picture
export async function POST(request: NextRequest) {
    try {
        const session = await auth.getCurrentUser(request);
        if (!session?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { pathname } = new URL(request.url);
        const formData = await request.formData();

        // Determinar el endpoint basado en el pathname
        const endpoint = pathname.endsWith('/picture')
            ? `${process.env.API_URL}/users/profile/picture`
            : `${process.env.API_URL}/users/profile/resume`;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload ${pathname.endsWith('/picture') ? 'profile picture' : 'resume'}`);
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload file' },
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

// DELETE /api/user/profile/resume
export async function DELETE(request: NextRequest) {
    try {
        const session = await auth.getCurrentUser(request);
        if (!session?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const response = await fetch(`${process.env.API_URL}/users/profile/resume`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session.token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete resume');
        }

        return NextResponse.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Resume delete error:', error);
        return NextResponse.json(
            { error: 'Failed to delete resume' },
            { status: 500 }
        );
    }
}