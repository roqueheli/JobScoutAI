import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    accountType: z.enum(["candidate", "employer"]),
    company: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password, accountType, company } = registerSchema.parse(body);

        const response = await fetch(`${process.env.API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: name.split(' ')[0],
                lastName: name.split(' ').slice(1).join(' ') || '',
                email,
                password,
                role: accountType === 'employer' ? 'ADMIN' : 'APPLICANT',
                company: accountType === 'employer' ? company : undefined,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || 'Registration failed' },
                { status: response.status }
            );
        }

        // Set the JWT token from the NestJS backend in an HTTP-only cookie
        const nextResponse = NextResponse.json(
            { message: "Registered successfully" },
            { status: 201 }
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