import prisma from "@/lib/prisma";
import { jwtVerify, SignJWT } from "jose";
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export interface AuthUser {
    id: string; // Cambiado a string para que coincida con el tipo de JWT
    email: string;
    first_name: string;
    last_name: string;
    role: 'ADMIN' | 'APPLICANT';
    phone: string | null;
    profile_picture: string | null;
    company_id: number | null;
    resume_url: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    is_active: boolean;
    token?: string;
    created_at: Date;
    updated_at: Date;
}

interface JWTPayload extends Record<string, any> {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: 'ADMIN' | 'APPLICANT';
    phone: string | null;
    profile_picture: string | null;
    company_id: number | null;
    resume_url: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    is_active: boolean;
    accessToken: string;
    iat?: number;
    exp?: number;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');

export const auth = {
    async encrypt(payload: JWTPayload): Promise<string> {
        return await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(secret);
    },

    async decrypt(input: string): Promise<JWTPayload> {
        const { payload } = await jwtVerify(input, secret, {
            algorithms: ["HS256"],
        });
        return payload as JWTPayload;
    },

    async getSession(): Promise<JWTPayload | null> {
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
            // Esperar a que se resuelva la Promise de cookies()
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
                role: payload.role as 'ADMIN' | 'APPLICANT',
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
                    company_id: true,
                    resume_url: true,
                    linkedin_url: true,
                    github_url: true,
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
                httpOnly: false,
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

    async checkRole(request: NextRequest, allowedRoles: Array<'ADMIN' | 'APPLICANT'>): Promise<boolean> {
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
                            return {
                                id: user.id,
                                email: user.email,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                role: user.role,
                                phone: user.phone,
                                profile_picture: user.profile_picture,
                                resume_url: user.resume_url,
                                linkedin_url: user.linkedin_url,
                                github_url: user.github_url,
                                is_active: user.is_active,
                                accessToken: user.accessToken
                            };
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
                        id: user.id.toString(),
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        role: user.role,
                        phone: user.phone,
                        profile_picture: user.profile_picture,
                        resume_url: user.resume_url,
                        linkedin_url: user.linkedin_url,
                        github_url: user.github_url,
                        is_active: user.is_active,
                        accessToken: user.accessToken
                    };
                }
                return token;
            },
            async session({ session, token }) {
                if (token) {
                    session.user = {
                        ...session.user,
                        id: token.id as string,
                        email: token.email as string,
                        first_name: token.first_name as string,
                        last_name: token.last_name as string,
                        role: token.role as 'ADMIN' | 'APPLICANT',
                        phone: token.phone as string | null,
                        profile_picture: token.profile_picture as string | null,
                        company_id: token.company_id as number | null,
                        resume_url: token.resume_url as string | null,
                        linkedin_url: token.linkedin_url as string | null,
                        github_url: token.github_url as string | null,
                        is_active: token.is_active as boolean,
                        accessToken: token.accessToken as string
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
    interface User {
        id: string; // Cambiado a string para que coincida con el tipo de JWT
        email: string;
        first_name: string;
        last_name: string;
        role: 'ADMIN' | 'APPLICANT'; // Actualizado para incluir todos los roles  
        phone?: string;
        profile_picture?: string;
        profession?: string; // Nuevo campo  
        location?: string; // Nuevo campo  
        bio?: string; // Nuevo campo  
        experience_years?: string; // Nuevo campo  
        education?: string; // Nuevo campo  
        languages?: string; // Nuevo campo  
        resume_url?: string;
        linkedin_url?: string;
        github_url?: string;
        website?: string; // Nuevo campo  
        is_active: boolean;
        accessToken: string;
    }

    interface Session {
        user: AuthUser & {
            accessToken: string;
        };
    }

    interface JWT {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        role: 'ADMIN' | 'APPLICANT'; // Actualizado para incluir todos los roles  
        phone?: string;
        profile_picture?: string;
        profession?: string; // Nuevo campo  
        location?: string; // Nuevo campo  
        bio?: string; // Nuevo campo  
        experience_years?: string; // Nuevo campo  
        education?: string; // Nuevo campo  
        languages?: string; // Nuevo campo  
        resume_url?: string;
        linkedin_url?: string;
        github_url?: string;
        website?: string; // Nuevo campo  
        is_active: boolean;
        accessToken: string;
        iat?: number;
        exp?: number;
    }
}