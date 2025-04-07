"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();  // Obtener sesión actual y su estado

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      // Espera a que la sesión se actualice
      if (session?.user?.role === "ADMIN") {
        router.push("/dashboard/users");  // Redirige a Admin Dashboard
      } else {
        router.push("/dashboard");  // Redirige al Dashboard de usuario
      }
    }
  };

  // Verifica el estado de la sesión y redirige
  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "ADMIN") {
        router.push("/dashboard/users");  // Redirige a Admin Dashboard
      } else {
        router.push("/dashboard");  // Redirige al Dashboard de usuario
      }
    }
  }, [status, session, router]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", background: "#fff" }}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>Don't have an account? <a href="/register" style={{ color: "#0070f3", textDecoration: "none" }}>Register here</a></p>
      </form>
    </div>
  );
}
