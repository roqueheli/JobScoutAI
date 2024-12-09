import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Accede al valor del token  

  // Rutas públicas que no requieren autenticación  
  const publicPaths = ["/", "/auth/login", "/auth/register", "/jobs", "/companies"];
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // Si no hay token y se intenta acceder a una ruta protegida  
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Si existe un token y se intenta acceder a rutas de autenticación  
  if (token && (request.nextUrl.pathname === "/auth/login" || request.nextUrl.pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Validar el token con el backend de NestJS en rutas protegidas  
  if (token && !isPublicPath) {
    try {
      const response = await fetch(`${process.env.API_URL}/auth/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // El token es inválido, redirigir a login  
        const redirectResponse = NextResponse.redirect(new URL("/auth/login", request.url));
        redirectResponse.cookies.set({
          name: "token",
          value: "",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 0,
        });
        return redirectResponse;
      }
    } catch (error) {
      // Error en la API, permite que la solicitud continúe pero el token será validado por la API  
      console.error('Error de validación del token:', error);
    }
  }

  const response = NextResponse.next();
  response.headers.set('x-pathname', request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: [
    /*  
     * Coincidir con todas las rutas de solicitud excepto:  
     * - _next/static (archivos estáticos)  
     * - _next/image (archivos de optimización de imágenes)  
     * - favicon.ico (archivo favicon)  
     * - carpeta pública  
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
