// app/dashboard/users/page.tsx
import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import UserList from "./UserList";

const prisma = new PrismaClient();

export default async function UsersPage() {
  // Obtén los usuarios desde la base de datos en el servidor
  const users: User[] = await prisma.user.findMany();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Usuarios Registrados</h1>
      {/* Pasa los usuarios al componente de lista de usuarios */}
      <UserList users={users} />
    </div>
  );
}
