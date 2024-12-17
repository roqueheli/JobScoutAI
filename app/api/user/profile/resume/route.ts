import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/user/profile/resume - Descargar CV
export async function GET(request: NextRequest) {
    try {
        const session = await auth.getCurrentUser(request);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const response = await fetch(`${process.env.API_URL}/users/download/resume`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to download resume');
        }

        const blob = await response.blob();
        return new NextResponse(blob, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="resume.pdf"',
            },
        });
    } catch (error) {
        console.error('Resume download error:', error);
        return NextResponse.json(
            { error: 'Failed to download resume' },
            { status: 500 }
        );
    }
}

// POST /api/user/profile/resume - Subir CV
export async function POST(request: NextRequest) {
    try {
        const session = await auth.getCurrentUser(request);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('resume');

        if (!file) {
            return NextResponse.json(
                { error: 'No resume file provided' },
                { status: 400 }
            );
        }

        const response = await fetch(`${process.env.API_URL}/users/profile/resume`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload resume');
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Resume upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload resume' },
            { status: 500 }
        );
    }
}

// DELETE /api/user/profile/resume - Eliminar CV
export async function DELETE(request: NextRequest) {
    try {
        const session = await auth.getCurrentUser(request);
        if (!session) {
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