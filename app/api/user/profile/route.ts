// api/user/profile/route.ts  
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateProfileSchema = z.object({
    first_name: z.string().min(1).max(100).optional(),
    last_name: z.string().min(1).max(100).optional(),
    phone: z.string().max(20).nullable().optional(),
    profile_picture: z.string().max(255).nullable().optional(),
    resume_url: z.string().max(255).nullable().optional(),
    linkedin_url: z.string().max(255).nullable().optional(),
    github_url: z.string().max(255).nullable().optional(),
});

export async function GET(request: NextRequest) {
    try {
        const user = await auth.getCurrentUser(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const profile = await prisma.user.findUnique({
            where: { id: BigInt(user.id) },
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                role: true,
                phone: true,
                profile_picture: true,
                company_id: true,
                resume_url: true,
                linkedin_url: true,
                github_url: true,
                is_active: true,
                created_at: true,
                updated_at: true,
            },
        });

        if (!profile) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Profile fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const user = await auth.getCurrentUser(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const validatedData = updateProfileSchema.parse(data);

        const updatedProfile = await prisma.user.update({
            where: { id: BigInt(user.id) },
            data: validatedData,
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                role: true,
                phone: true,
                profile_picture: true,
                company_id: true,
                resume_url: true,
                linkedin_url: true,
                github_url: true,
                is_active: true,
                created_at: true,
                updated_at: true,
            },
        });

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

export async function POST(request: NextRequest) {
    try {
        const user = await auth.getCurrentUser(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('resume') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        if (!file.type.includes('pdf')) {
            return NextResponse.json(
                { error: 'Only PDF files are allowed' },
                { status: 400 }
            );
        }

        // Aquí iría la lógica para subir el archivo y obtener la URL  
        const resume_url = `https://storage.example.com/${Date.now()}-${file.name}`;

        const updatedUser = await prisma.user.update({
            where: { id: BigInt(user.id) },
            data: { resume_url },
            select: {
                id: true,
                resume_url: true,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Resume upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload resume' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const user = await auth.getCurrentUser(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const currentUser = await prisma.user.findUnique({
            where: { id: BigInt(user.id) },
            select: { resume_url: true },
        });

        if (!currentUser?.resume_url) {
            return NextResponse.json(
                { error: 'No resume found' },
                { status: 404 }
            );
        }

        // Aquí iría la lógica para eliminar el archivo físicamente  

        const updatedUser = await prisma.user.update({
            where: { id: BigInt(user.id) },
            data: { resume_url: null },
            select: {
                id: true,
                resume_url: true,
            },
        });

        return NextResponse.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Resume deletion error:', error);
        return NextResponse.json(
            { error: 'Failed to delete resume' },
            { status: 500 }
        );
    }
}
