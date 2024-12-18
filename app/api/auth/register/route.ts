import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Actualizado el schema según los campos que espera el backend  
const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    role: z.enum(["ADMIN", "APPLICANT", "COMPANY_ADMIN", "INTERVIEWER"]),
    phone: z.string().optional(),
    company_id: z.number().optional().nullable(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Transformar los datos recibidos al formato esperado por el backend  
        const transformedData = {
            email: body.email,
            password: body.password,
            first_name: body.first_name || body.name.split(' ')[0],
            last_name: body.last_name || body.name.split(' ').slice(1).join(' ') || '',
            role: body.accountType === 'candidate' ? 'APPLICANT' : 'COMPANY_ADMIN',
            company_id: body.company ? parseInt(body.company) : null,
            phone: body.phone,
        };

        // Validar los datos transformados  
        const validatedData = registerSchema.parse(transformedData);

        // Llamada al backend NestJS  
        const response = await fetch(`${process.env.API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        });

        const data = await response.json();

        // Log para debugging  
        console.log('Backend response:', {
            status: response.status,
            data: data
        });

        if (!response.ok) {
            return NextResponse.json(
                {
                    error: data.message || 'Registration failed',
                    details: data.errors || []
                },
                { status: response.status }
            );
        }

        // Crear la respuesta con el token JWT  
        const nextResponse = NextResponse.json(
            {
                message: "Registered successfully",
                user: data.user // Si el backend devuelve datos del usuario  
            },
            { status: 201 }
        );

        // Configurar la cookie con el token JWT  
        if (data.access_token) {
            nextResponse.cookies.set({
                name: "token",
                value: data.access_token,
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 86400, // 24 hours  
            });
        }

        return nextResponse;

    } catch (error) {
        console.error('Registration error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: error.errors
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}  