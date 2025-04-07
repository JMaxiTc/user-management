// app/dashboard/users/page.tsx
// Nota: Este archivo puede ser un Server Component si solo haces consulta a la DB
// y delegas la parte interactiva a componentes marcados como "use client".
import { PrismaClient } from "@prisma/client";
import Navbar from "@/components/Navbar";
import UserList from "./UserList";  // Asegúrate de que la ruta es correcta

const prisma = new PrismaClient();

export default async function UsersPage() {
  // Obtén los usuarios desde la base de datos
  const users = await prisma.user.findMany();

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h1>Usuarios Registrados</h1>
      <UserList users={users} />
    </div>
  );
}
