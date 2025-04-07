// app/dashboard/page.tsx
"use client"; // Marca este componente como un componente de cliente

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
    </div>
  );
}