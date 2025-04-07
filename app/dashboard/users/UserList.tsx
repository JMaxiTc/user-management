"use client";

import { useState } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type UserListProps = {
  users: User[];
};

export default function UserList({ users }: UserListProps) {
  const [updatedUsers, setUpdatedUsers] = useState(users);

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      const data = await response.json();
      if (data.error) {
        console.error("Error al actualizar el rol:", data.error);
      } else {
        // Actualiza el usuario en el estado local
        setUpdatedUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar rol:", error);
    }
  };

  return (
    <div>
      {updatedUsers.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
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
            {updatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    defaultValue={user.role}
                    onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                  >
                    <option value="ADMIN">Administrador</option>
                    <option value="USER">Colaborador</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
