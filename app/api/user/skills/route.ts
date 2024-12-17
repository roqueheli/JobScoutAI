import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// URL base del backend
const API_URL = process.env.API_URL;

export async function GET(request: NextRequest) {
    try {
        const session = await auth.getCurrentUser(request);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Obtener el token del usuario
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'No token provided' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');

        // Configurar headers para la petición al backend
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        let backendUrl = `${API_URL}/skills`;
        if (query) {
            // Si hay query, usar el endpoint de búsqueda
            backendUrl = `${API_URL}/skills/search?query=${encodeURIComponent(query)}`;
        }

        // Hacer la petición al backend
        const response = await fetch(backendUrl, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error(`Backend responded with status: ${response.status}`);
        }

        const skills = await response.json();
        return NextResponse.json(skills);

    } catch (error) {
        console.error('Error in skills route:', error);
        return NextResponse.json(
            { error: 'Failed to fetch skills' },
            { status: 500 }
        );
    }
}