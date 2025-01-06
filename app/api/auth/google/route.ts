import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Esquema de validación para el registro
const registerSchema = z.object({
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    role: z.string(),
    googleId: z.string(),
});

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const validatedData = registerSchema.parse(data);

        // Aquí deberías implementar la lógica para crear el usuario en la base de datos
        // Asegúrate de que el usuario no exista ya
        // const existingUser = await findUserByEmail(validatedData.email);
        // if (existingUser) {
        //     return NextResponse.json({ error: "User already exists" }, { status: 400 });
        // }

        // Crear el nuevo usuario
        const newUser = await createUser({
            email: validatedData.email,
            first_name: validatedData.first_name,
            last_name: validatedData.last_name,
            role: validatedData.role,
            googleId: validatedData.googleId,
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
    }
}

// Funciones auxiliares para manejar la base de datos
async function findUserByEmail(email: string) {
    // Implementa la lógica para buscar un usuario por correo electrónico en la base de datos
}

async function createUser(userData: any) {
    // Implementa la lógica para crear un nuevo usuario en la base de datos
}