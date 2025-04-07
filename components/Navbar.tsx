// components/Navbar.tsx
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#f5f5f5",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div>
        <Link href="/dashboard">
          <span
            style={{
              marginRight: "1rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Inicio
          </span>
        </Link>
        <Link href="/dashboard/users">
          <span style={{ marginRight: "1rem", cursor: "pointer" }}>
            Cuentas
          </span>
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span>Bienvenido, {session?.user?.email}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Salir
        </button>
      </div>
    </nav>
  );
}
