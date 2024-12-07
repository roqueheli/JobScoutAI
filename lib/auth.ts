import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, secret, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function getSession() {
    const token = cookies().get("token")?.value;
    if (!token) return null;
    try {
        const payload = await decrypt(token);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function updateSession(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    if (!token) return null;

    try {
        const payload = await decrypt(token);
        const user = await db.user.findUnique({
            where: { id: payload.id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                companyId: true,
            },
        });

        if (!user) return null;

        // Update the session with fresh data
        const session = await encrypt(user);
        const response = NextResponse.next();
        response.cookies.set({
            name: "token",
            value: session,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 86400, // 24 hours
        });

        return response;
    } catch (error) {
        return null;
    }
}