import { jwtVerify, type JWTPayload } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Extendemos la interfaz JWTPayload de jose
interface CustomJWTPayload extends JWTPayload {
  id: string;
  email: string;
  role: 'ADMIN' | 'APPLICANT';
}

// Configuración de rutas
const ROUTE_CONFIG = {
  public: ["/", "/auth/login", "/auth/register", "/jobs", "/companies"],
  protected: ["/user/profile", "/user/applications"],
  admin: ["/admin"],
  applicant: ["/applications"],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isPublicPath = ROUTE_CONFIG.public.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );
  const isProtectedPath = ROUTE_CONFIG.protected.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );
  const isAdminPath = ROUTE_CONFIG.admin.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );
  const isApplicantPath = ROUTE_CONFIG.applicant.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  // // Función para verificar el token
  // async function verifyToken(token: string): Promise<CustomJWTPayload | null> {
  //   try {
  //     console.log('', process.env.JWT_SECRET);
      
  //     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  //     const { payload } = await jwtVerify(token, secret);

  //     // Verificamos que el payload tenga las propiedades necesarias
  //     if (
  //       typeof payload.id === 'string' &&
  //       typeof payload.email === 'string' &&
  //       (payload.role === 'ADMIN' || payload.role === 'APPLICANT')
  //     ) {
  //       return payload as CustomJWTPayload;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error('Token verification failed:', error);
  //     return null;
  //   }
  // }

  // Función para redirigir al login
  function redirectToLogin() {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    return response; // No borres el token aquí
  }

  // Si no hay token y se intenta acceder a una ruta protegida
  if (!token && (isProtectedPath || isAdminPath || isApplicantPath)) {
    console.log('No token found, redirecting to login');
    return redirectToLogin();
  }

  // Si hay token y se intenta acceder a rutas de autenticación
  if (token && (request.nextUrl.pathname === "/auth/login" ||
    request.nextUrl.pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Validar el token en rutas protegidas
  // if (token && (isProtectedPath || isAdminPath || isApplicantPath)) {
  //   try {
  //     // Verificar token localmente
  //     const payload = await verifyToken(token);

  //     if (!payload) {
  //       console.log('Token is invalid, redirecting to login');
  //       return redirectToLogin();
  //     }

  //     // Verificar roles para rutas específicas
  //     if (isAdminPath && payload.role !== 'ADMIN') {
  //       console.log('User is not an admin, redirecting to home');
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }

  //     if (isApplicantPath && payload.role !== 'APPLICANT') {
  //       console.log('User is not an applicant, redirecting to home');
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }

  //     // Validar con el backend
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       console.log('Backend validation failed, redirecting to login');
  //       return redirectToLogin();
  //     }

  //   } catch (error) {
  //     console.error('Token validation error:', error);
  //     return redirectToLogin();
  //   }
  // }

  // Configurar headers para la respuesta
  const response = NextResponse.next();
  response.headers.set('x-pathname', request.nextUrl.pathname);

  // Si hay token válido, agregar el ID del usuario al header
  // if (token) {
  //   const payload = await verifyToken(token);
  //   if (payload) {
  //     response.headers.set('x-user-id', payload.id);
  //     response.headers.set('x-user-role', payload.role);
  //   }
  // }

  return response;
}

export const config = {
  matcher: [
    '/user/:path*',
    '/api/user/:path*',
    '/admin/:path*',
    '/applications/:path*',
    '/api/auth/:path*',
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};