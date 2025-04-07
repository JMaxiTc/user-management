import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Estado de carga
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Si no hay sesión, redirigir al login
  useEffect(() => {
    if (!session) {
      router.push("/login"); // Redirige a la página de login
    } else if (session.user.role !== "ADMIN") {
      router.push("/dashboard/users"); // Redirige a la página principal o una página específica
    }
  }, [session, router]);

  if (session?.user?.role === "ADMIN") {
    return <h1>Admin Dashboard</h1>;
  }

  return null; // Esto nunca se debería mostrar debido a la redirección
}
