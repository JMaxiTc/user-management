// app/api/users/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, role } = await request.json();
    // Actualiza el rol del usuario
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
    return NextResponse.json({ message: "Rol actualizado", updatedUser });
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    return NextResponse.json({ error: "Error al actualizar el rol" }, { status: 500 });
  }
}
