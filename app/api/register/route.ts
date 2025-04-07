import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Verifica si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el nuevo usuario
    const user = await prisma.user.create({
      data: {
        name: "Default Name", // Replace with a dynamic value if needed
        email,
        password: hashedPassword,
        role: "USER", // o "ADMIN" si quieres
      },
    });

    return NextResponse.json({ message: "Usuario registrado correctamente", user });
  } catch (error) {
    console.error("Error al registrar:", error);
    return NextResponse.json({ error: "Algo salió mal" }, { status: 500 });
  }
}
