import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/user/profile/picture - Subir foto de perfil
export async function POST(request: NextRequest) {
    try {
        const session = await auth.getCurrentUser(request);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('profile_picture');

        if (!file) {
            return NextResponse.json(
                { error: 'No profile picture provided' },
                { status: 400 }
            );
        }

        const response = await fetch(`${process.env.API_URL}/users/profile/picture`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload profile picture');
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Profile picture upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload profile picture' },
            { status: 500 }
        );
    }
}