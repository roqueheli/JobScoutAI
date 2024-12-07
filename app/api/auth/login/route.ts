import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = loginSchema.parse(body);

        const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || 'Invalid credentials' },
                { status: response.status }
            );
        }

        // Set the JWT token from the NestJS backend in an HTTP-only cookie
        const nextResponse = NextResponse.json(
            {
                message: "Logged in successfully",
                user: {
                    id: data.user.id,
                    email: data.user.email,
                    firstName: data.user.first_name,
                    lastName: data.user.last_name,
                    role: data.user.role,
                }
            },
            { status: 200 }
        );

        nextResponse.cookies.set({
            name: "token",
            value: data.access_token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 86400, // 24 hours
        });

        return nextResponse;
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}