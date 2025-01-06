import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET, // Asegúrate de configurar esta variable en tu .env
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                try {
                    const response = await fetch(`${process.env.API_URL}/api/auth/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user.email,
                            first_name: user.name?.split(" ")[0] || "",
                            last_name: user.name?.split(" ")[1] || "",
                            profile_picture: user.image,
                            isGoogle: true,
                        }),
                    });

                    if (!response.ok) {
                        console.error("Failed to save user in database");
                        return false;
                    }
                } catch (error) {
                    console.error("Error saving user:", error);
                    return false;
                }
            }
            return true;
        },
        async session({ session, token }) {
            // Agregar información adicional a la sesión si es necesario
            return session;
        },
        async jwt({ token, account }) {
            // Agregar información adicional al token si es necesario
            return token;
        },
    },
});

export { handler as GET, handler as POST };
