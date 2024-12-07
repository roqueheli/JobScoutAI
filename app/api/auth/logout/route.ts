import { NextResponse } from "next/server";

export async function POST() {
    try {
        // No need to call the backend for logout since we're just removing the cookie
        const response = NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 }
        );

        response.cookies.set({
            name: "token",
            value: "",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0,
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}