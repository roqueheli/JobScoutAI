import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/context/auth/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobScoutAI - Interview smarter, hire better.",
  description: "Tech and soft skills, assessed by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="border w-full border-gray-400 min-h-screen bg-background">
            <AuthProvider>
              <Navbar />
              <main className="flex justify-center flex-1 min-h-screen">
                {children}
              </main>
              <Footer />
              <Toaster />
            </AuthProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
