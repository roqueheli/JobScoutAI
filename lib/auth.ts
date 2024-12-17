import prisma from "@/lib/prisma";
import { Role } from '@prisma/client';
import { jwtVerify, SignJWT } from "jose";
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Extender el tipo JWTPayload de jose
interface CustomJWTPayload extends Record<string, any> {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: Role;
    phone?: string | null;
    profile_picture?: string | null;
    profession?: string | null;
    location?: string | null;
    bio?: string | null;
    experience_years?: string | null;
    education?: string | null;
    languages?: string | null;
    resume_url?: string | null;
    linkedin_url?: string | null;
    github_url?: string | null;
    website?: string | null;
    is_active?: boolean;
    created_at?: Date;
    updated_at?: Date;
    accessToken?: string;
}

export interface AuthUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: Role;
    phone: string | null;
    profile_picture: string | null;
    profession: string | null;
    location: string | null;
    bio: string | null;
    experience_years: string | null;
    education: string | null;
    languages: string | null;
    resume_url: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    website: string | null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');

export const auth = {
    async encrypt(payload: CustomJWTPayload): Promise<string> {
        return await new SignJWT({ ...payload })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(secret);
    },

    async decrypt(input: string): Promise<CustomJWTPayload> {
        const { payload } = await jwtVerify(input, secret, {
            algorithms: ["HS256"],
        });
        return payload as unknown as CustomJWTPayload;
    },

    async getSession(): Promise<CustomJWTPayload | null> {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return null;
        try {
            return await this.decrypt(token);
        } catch (error) {
            return null;
        }
    },

    async getCurrentUser(request: NextRequest) {
        try {
            const cookieStore = await cookies();
            const token = cookieStore.get('token')?.value;

            if (!token) {
                return null;
            }

            const { payload } = await jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET)
            );

            return {
                id: payload.sub,
                email: payload.email as string,
                first_name: payload.first_name as string,
                last_name: payload.last_name as string,
                role: payload.role as Role,
                token: token,
            };
        } catch (error) {
            console.error('Auth error:', error);
            return null;
        }
    },

    async updateSession(request: NextRequest): Promise<NextResponse | null> {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return null;

        try {
            const payload = await this.decrypt(token);
            const user = await prisma.user.findUnique({
                where: { id: BigInt(payload.id) },
                select: {
                    id: true,
                    email: true,
                    first_name: true,
                    last_name: true,
                    role: true,
                    phone: true,
                    profile_picture: true,
                    profession: true,
                    location: true,
                    bio: true,
                    experience_years: true,
                    education: true,
                    languages: true,
                    resume_url: true,
                    linkedin_url: true,
                    github_url: true,
                    website: true,
                    is_active: true,
                    created_at: true,
                    updated_at: true,
                },
            });

            if (!user) return null;

            const session = await this.encrypt({
                ...user,
                id: user.id.toString(),
                accessToken: payload.accessToken,
            });

            const response = NextResponse.next();
            response.cookies.set({
                name: "token",
                value: session,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 86400,
            });

            return response;
        } catch (error) {
            console.error('Session update error:', error);
            return null;
        }
    },

    async checkRole(request: NextRequest, allowedRoles: Role[]): Promise<boolean> {
        const session = await this.getSession();
        if (!session) return false;
        return allowedRoles.includes(session.role);
    },

    config: {
        providers: [
            CredentialsProvider({
                name: 'Credentials',
                credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials): Promise<User | null> {
                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    try {
                        const res = await fetch(`${process.env.API_URL}/auth/login`, {
                            method: 'POST',
                            body: JSON.stringify(credentials),
                            headers: { "Content-Type": "application/json" }
                        });

                        const user = await res.json();

                        if (res.ok && user) {
                            return user;
                        }
                        return null;
                    } catch (error) {
                        console.error('Auth error:', error);
                        return null;
                    }
                }
            })
        ],
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    return {
                        ...token,
                        ...user,
                        id: user.id.toString(),
                    };
                }
                return token;
            },
            async session({ session, token }) {
                if (token) {
                    session.user = {
                        ...token,
                        id: token.id as string,
                    } as AuthUser & { accessToken: string };
                }
                return session;
            }
        },
        session: {
            strategy: 'jwt'
        },
        pages: {
            signIn: '/auth/login',
        },
        secret: process.env.JWT_SECRET,
    } as NextAuthOptions,
};

export const authOptions: NextAuthOptions = auth.config;
export const { encrypt, decrypt, getSession, updateSession, checkRole } = auth;

declare module "next-auth" {
    interface User extends Omit<AuthUser, 'role'> {
        role: Role;
        accessToken: string;
    }

    interface Session {
        user: AuthUser & {
            accessToken: string;
        };
    }

    interface JWT extends Omit<AuthUser, 'role'> {
        role: Role;
        accessToken: string;
        iat?: number;
        exp?: number;
    }
}