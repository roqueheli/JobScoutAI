import { jwtVerify } from 'jose'; // Importa jwtVerify de la biblioteca jose
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value; // Obtén el token de las cookies

        if (!token) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Verificar el token usando jose
        const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Asegúrate de que el secreto esté definido
        const { payload } = await jwtVerify(token, secret); // Verifica el token

        // Si el token es válido, puedes hacer la lógica para obtener el usuario
        const response = await fetch(`${process.env.API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || 'Failed to get user' },
                { status: response.status }
            );
        }

        return NextResponse.json({
            user: {
                id: data.id,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                role: data.role,
                profilePicture: data.profile_picture,
                company: data.company ? {
                    id: data.company.id,
                    name: data.company.name,
                    logo: data.company.logo,
                } : undefined,
            }
        });
    } catch (error) {
        console.error('Token verification error:', error); // Agrega un log para el error
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}