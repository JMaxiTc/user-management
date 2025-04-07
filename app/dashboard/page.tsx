// app/dashboard/page.tsx
"use client"; // si requieres hooks de cliente, por ejemplo para el Navbar

import Navbar from "@/components/Navbar";

export default function DashboardHome() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h1>Panel de Inicio</h1>
        <p>Bienvenido al sistema. Usa el menú para navegar.</p>
      </div>
    </>
  );
}
