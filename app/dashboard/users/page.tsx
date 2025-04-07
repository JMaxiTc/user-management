// app/dashboard/users/page.tsx
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function UsersPage() {
  // Consulta todos los usuarios
  const users = await prisma.user.findMany();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Usuarios Registrados</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                {/* Aquí se puede colocar un botón o formulario para editar el rol */}
                <form method="post" action="/api/users">
                  <input type="hidden" name="userId" value={user.id} />
                  <select name="role" defaultValue={user.role}>
                    <option value="ADMIN">Administrador</option>
                    <option value="USER">Colaborador</option>
                  </select>
                  <button type="submit">Actualizar</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
