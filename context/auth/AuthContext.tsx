"use client";

import { UserRole } from "@/types/auth";
import { UserProfile } from "@/types/user";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>; // Añadido para verificar la autenticación
  loading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  company?: string;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  checkAuth: async () => {}, // Inicialmente vacío
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me"); // Cambia esto si tienes un endpoint específico para verificar la sesión
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to login");
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {     
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register");
      }

      const userData = await response.json(); // Actualizar el estado del contexto si es necesario
      
      setUser(userData.user);
    } catch (error) {
      console.error("Registration error details:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        register,
        logout,
        checkAuth, // Añadido al contexto
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
